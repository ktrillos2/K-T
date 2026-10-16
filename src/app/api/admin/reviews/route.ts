import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getAdminReviews, mutateSanity } from "@/lib/sanity";

export const runtime = "nodejs";

function isAuthorized(req: Request): boolean {
  const adminPin = process.env.ADMIN_PIN || "kyt2026";
  const pinHeader = req.headers.get("x-admin-pin");
  const url = new URL(req.url);
  const pinQuery = url.searchParams.get("pin");
  return (pinHeader === adminPin || pinQuery === adminPin);
}

/**
 * GET /api/admin/reviews
 * Lista todas las reseñas registradas en Sanity (pendientes, aprobadas y rechazadas).
 */
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const reviews = await getAdminReviews();
    return NextResponse.json({ ok: true, reviews });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[admin-reviews] Error fetching:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

/**
 * POST /api/admin/reviews
 * Crea una nueva reseña directamente en Sanity.
 */
export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, role, project, projectUrl, content, rating = 5, status = "approved", avatarAssetId } = body;

    if (!name || !content) {
      return NextResponse.json({ ok: false, error: "Nombre y contenido son obligatorios" }, { status: 400 });
    }

    const doc: Record<string, unknown> = {
      _type: "testimonial",
      name: String(name).trim(),
      role: role ? String(role).trim() : undefined,
      project: project ? String(project).trim() : undefined,
      projectUrl: projectUrl ? String(projectUrl).trim() : undefined,
      content: String(content).trim(),
      rating: Number(rating) || 5,
      status: status || "approved",
    };

    if (avatarAssetId) {
      doc.avatar = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: avatarAssetId,
        },
      };
    }

    const result = await mutateSanity([{ create: doc }]);

    // Revalidar caché de testimonios
    try {
      revalidateTag("testimonials");
      revalidatePath("/[lang]/testimonios", "page");
      revalidatePath("/testimonios", "page");
    } catch {
      // Ignorar si no está en contexto de request dinámico
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[admin-reviews] Error creating:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/reviews
 * Modifica estado o contenido de una reseña en Sanity.
 */
export async function PATCH(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, name, role, project, content, rating, avatarAssetId } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID de reseña requerido" }, { status: 400 });
    }

    const setFields: Record<string, unknown> = {};
    if (status) setFields.status = status;
    if (name !== undefined) setFields.name = String(name).trim();
    if (role !== undefined) setFields.role = String(role).trim();
    if (project !== undefined) setFields.project = String(project).trim();
    if (content !== undefined) setFields.content = String(content).trim();
    if (rating !== undefined) setFields.rating = Number(rating);

    if (avatarAssetId) {
      setFields.avatar = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: avatarAssetId,
        },
      };
    }

    const mutations = [
      {
        patch: {
          id,
          set: setFields,
        },
      },
    ];

    const result = await mutateSanity(mutations);

    // Revalidar páginas
    try {
      revalidateTag("testimonials");
      revalidatePath("/[lang]/testimonios", "page");
      revalidatePath("/testimonios", "page");
    } catch {
      // Ignorar en catch
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[admin-reviews] Error patching:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/reviews
 * Elimina una reseña en Sanity.
 */
export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID requerido" }, { status: 400 });
    }

    const result = await mutateSanity([{ delete: { id } }]);

    try {
      revalidateTag("testimonials");
      revalidatePath("/[lang]/testimonios", "page");
      revalidatePath("/testimonios", "page");
    } catch {
      // Ignorar
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[admin-reviews] Error deleting:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { uploadImageToSanity, sanityImageUrl } from "@/lib/sanity";

export const runtime = "nodejs";

function isAuthorized(req: Request): boolean {
  const adminPin = process.env.ADMIN_PIN || "kyt2026";
  const pinHeader = req.headers.get("x-admin-pin");
  const url = new URL(req.url);
  const pinQuery = url.searchParams.get("pin");
  return (pinHeader === adminPin || pinQuery === adminPin);
}

/**
 * POST /api/admin/upload
 * Sube una imagen directamente a Sanity Assets CDN usando el SANITY_WRITE_TOKEN.
 * Retorna el ID del activo y la URL optimizada en el CDN de Sanity.
 */
export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ ok: false, error: "No se proporcionó ningún archivo de imagen" }, { status: 400 });
    }

    const filename = (file as File).name || `upload-${Date.now()}.png`;
    const contentType = file.type || "image/png";

    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ ok: false, error: "Solo se permiten archivos de imagen" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const asset = await uploadImageToSanity(buffer, filename, contentType);
    const cdnUrl = sanityImageUrl(asset.url, { quality: 85, fit: "max" });

    return NextResponse.json({
      ok: true,
      assetId: asset.id,
      url: asset.url,
      cdnUrl,
      width: asset.width,
      height: asset.height,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[admin-upload] Error uploading image to Sanity:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

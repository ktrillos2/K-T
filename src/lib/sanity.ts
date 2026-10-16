/**
 * Cliente y utilidades para Sanity CMS y su CDN de imágenes optimizado.
 * Manejo centralizado de reseñas (testimonios) y subida de activos a Sanity CDN.
 */

export const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bc3zxc91";
export const SANITY_DATASET = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const SANITY_CDN_BASE = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/`;
export const SANITY_API_DATA = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data`;
export const SANITY_API_ASSETS = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/assets/images/${SANITY_DATASET}`;

export type SanityImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "max" | "crop" | "fill" | "fillmax" | "min" | "scale";
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
};

/**
 * Transforma una URL o asset ID de Sanity en una URL optimizada por su CDN.
 * Aplica compresión inteligente (auto=format) y escalado sin pérdida de calidad.
 */
export function sanityImageUrl(urlOrId: string | undefined | null, opts: SanityImageOptions = {}): string | undefined {
  if (!urlOrId) return undefined;

  let base = urlOrId;
  // Si viene en formato "image-hash-1920x1080-png" (asset ID de Sanity)
  if (urlOrId.startsWith("image-")) {
    const parts = urlOrId.split("-");
    if (parts.length >= 4) {
      const hash = parts[1];
      const dimensions = parts[2];
      const ext = parts[3];
      base = `${SANITY_CDN_BASE}${hash}-${dimensions}.${ext}`;
    }
  }

  // Si no es una URL de cdn.sanity.io, devolverla tal cual
  if (!base.includes("cdn.sanity.io")) return base;

  // Limpiar parámetros query previos si los hay
  const [cleanUrl] = base.split("?");

  const params = new URLSearchParams();
  params.set("auto", opts.format && opts.format !== "auto" ? opts.format : "format");
  params.set("fit", opts.fit || "max");
  params.set("q", String(opts.quality || 82));
  if (opts.width) params.set("w", String(opts.width));
  if (opts.height) params.set("h", String(opts.height));

  return `${cleanUrl}?${params.toString()}`;
}

export type SanityReview = {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;
  name: string;
  role?: string;
  project?: string;
  projectUrl?: string;
  content: string;
  rating?: number;
  status: "pending" | "approved" | "rejected";
  avatarUrl?: string;
  avatarAssetId?: string;
};

/**
 * Consulta todas las reseñas desde Sanity con el token de escritura para tener
 * acceso en tiempo real a estados pendientes, aprobados y rechazados.
 */
export async function getAdminReviews(): Promise<SanityReview[]> {
  const token = process.env.SANITY_WRITE_TOKEN;
  const query = encodeURIComponent(`*[_type == "testimonial"] | order(_createdAt desc){
    _id,
    _createdAt,
    _updatedAt,
    name,
    role,
    project,
    projectUrl,
    content,
    rating,
    status,
    "avatarUrl": avatar.asset->url,
    "avatarAssetId": avatar.asset->_id
  }`);

  const res = await fetch(`${SANITY_API_DATA}/query/${SANITY_DATASET}?query=${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Sanity query error: ${res.status} ${await res.text()}`);
  }

  const json = (await res.json()) as { result?: Record<string, unknown>[] };
  return (json.result ?? []).map((doc) => ({
    _id: String(doc._id || ""),
    _createdAt: String(doc._createdAt || ""),
    _updatedAt: doc._updatedAt ? String(doc._updatedAt) : undefined,
    name: String(doc.name || "").trim(),
    role: doc.role ? String(doc.role).trim() : undefined,
    project: doc.project ? String(doc.project).trim() : undefined,
    projectUrl: doc.projectUrl ? String(doc.projectUrl).trim() : undefined,
    content: String(doc.content || "").trim(),
    rating: typeof doc.rating === "number" ? doc.rating : 5,
    status: (doc.status as "pending" | "approved" | "rejected") || "pending",
    avatarUrl: doc.avatarUrl ? sanityImageUrl(String(doc.avatarUrl), { width: 160, height: 160, fit: "crop" }) : undefined,
    avatarAssetId: doc.avatarAssetId ? String(doc.avatarAssetId) : undefined,
  }));
}

/**
 * Sube una imagen directamente a Sanity Assets CDN y retorna el asset document.
 */
export async function uploadImageToSanity(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<{ id: string; url: string; width?: number; height?: number }> {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error("SANITY_WRITE_TOKEN no está configurado.");

  const safeFilename = encodeURIComponent(filename.replace(/[^a-zA-Z0-9.-]/g, "_"));
  const res = await fetch(`${SANITY_API_ASSETS}?filename=${safeFilename}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    },
    body: new Uint8Array(buffer),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al subir imagen a Sanity (${res.status}): ${errorText}`);
  }

  const json = (await res.json()) as { document?: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } } };
  const doc = json.document;
  if (!doc) throw new Error("Sanity no retornó el documento de imagen.");

  return {
    id: doc._id,
    url: doc.url,
    width: doc.metadata?.dimensions?.width,
    height: doc.metadata?.dimensions?.height,
  };
}

/**
 * Ejecuta mutaciones en Sanity usando SANITY_WRITE_TOKEN.
 */
export async function mutateSanity(mutations: unknown[]) {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error("SANITY_WRITE_TOKEN no está configurado.");

  const res = await fetch(`${SANITY_API_DATA}/mutate/${SANITY_DATASET}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error en mutación de Sanity (${res.status}): ${errorText}`);
  }

  return (await res.json()) as { transactionId: string; results: unknown[] };
}

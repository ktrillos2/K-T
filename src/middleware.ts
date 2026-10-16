import { NextResponse, type NextRequest } from "next/server";

/**
 * Idiomas: el español vive en la raíz (/precios) y el inglés en /en (/en/precios).
 * Internamente todo se sirve desde app/[lang]. También deja el país del visitante
 * en una cookie (cabecera de Vercel) para mostrar los precios en su moneda.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // /es/... es la versión por defecto: redirige a la URL sin prefijo.
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/es/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  let res: NextResponse;
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    res = NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = `/es${pathname === "/" ? "" : pathname}`;
    url.search = search;
    res = NextResponse.rewrite(url);
  }

  if (!req.cookies.get("kt-country")) {
    const geo = req.headers.get("x-vercel-ip-country");
    if (geo) res.cookies.set("kt-country", geo.toUpperCase(), { path: "/", maxAge: 60 * 60 * 24 * 180, sameSite: "lax" });
  }
  return res;
}

export const config = {
  // Todo menos archivos estáticos, API y rutas de metadatos.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

import { isLang, type Lang } from "./config";

export type LangParams = { params: Promise<{ lang: string }> };

/** Idioma de la ruta (el layout ya descarta los valores inválidos). */
export async function langOf(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  return isLang(lang) ? lang : "es";
}

#!/usr/bin/env node
/**
 * Avisa a Bing, Yandex, Seznam y Naver (IndexNow) que hay URLs nuevas o actualizadas.
 * Bing alimenta a Copilot y a la búsqueda de ChatGPT, así que esto acelera que la IA vea los cambios.
 *
 * Uso (después de cada despliegue a producción):
 *   npm run indexnow                 # envía todas las URLs del sitemap
 *   npm run indexnow -- /blog/slug   # solo las rutas indicadas
 *
 * La clave vive en public/ed16c7639ddf0b171950620723d41d7b.txt (debe estar publicada en el dominio).
 */
const HOST = "www.kytcode.lat";
const KEY = "ed16c7639ddf0b171950620723d41d7b";
const SITE = `https://${HOST}`;

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : `/${p}`}`));
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) {
  console.error("No hay URLs para enviar.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} · ${urls.length} URLs`);
if (res.status >= 400) process.exit(1);

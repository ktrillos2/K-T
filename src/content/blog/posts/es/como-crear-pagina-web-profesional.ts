import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Una web corporativa profesional se distingue de una amateur por su infraestructura, su arquitectura, su velocidad, su seguridad y su accesibilidad.",
    "Bases: dominio propio con DNS en una red rápida, alojamiento en red global y renderizado en el servidor.",
    "Metas de experiencia: LCP por debajo de 2,5 s y que nada se mueva mientras carga (CLS bajo).",
  ],
  md: `
Una página corporativa es la carta de presentación de tu empresa ante clientes, aliados e inversionistas. Esto es lo que la separa de un sitio amateur.

## Las bases técnicas {#bases}

- **Dominio propio y DNS en una red rápida:** mejora la resolución y la seguridad desde el primer clic.
- **Infraestructura global:** el sitio responde igual de rápido en Bogotá, Ciudad de México o Miami, y escala en picos de tráfico.
- **Renderizado en el servidor:** el contenido llega completo en el HTML, lo que favorece la velocidad y el SEO.

## Paso 1: elegir la arquitectura {#arquitectura}

Los gestores de contenido tradicionales sirven para blogs estándar. Cuando el proyecto necesita escalar o integrarse con otros sistemas, una arquitectura **headless** separa la interfaz del contenido: interfaces más ligeras, base de datos no expuesta y libertad para rediseñar sin tocar los datos.

## Paso 2: desarrollar pensando en Core Web Vitals {#core-web-vitals}

### LCP (Largest Contentful Paint)

El tiempo que tarda en aparecer el bloque principal (imagen o título). La meta es menos de 2,5 segundos; nuestros sitios suelen estar por debajo de uno.

### CLS (Cumulative Layout Shift)

La estabilidad visual mientras carga: los botones no deben moverse cuando el usuario va a tocarlos.

### INP (Interaction to Next Paint)

Qué tan rápido responde la página a un toque o clic. La meta es menos de 200 ms.

## Requisitos B2B {#b2b}

:::checklist id="web-corporativa-b2b" title="Estándares de una web corporativa profesional"
- Dominio y correo corporativo con el nombre de la empresa
- Certificado SSL y política de privacidad
- Páginas de servicios, casos de éxito y contacto
- Datos estructurados de la organización
- Velocidad medida y aprobada en móvil
- Accesibilidad: contraste, textos alternativos y navegación con teclado
- Formularios conectados a correo y CRM
- Analítica configurada
:::

Conoce nuestro servicio de [diseño web corporativo](/servicios/diseno-web-corporativo) o los [precios](/precios).
`,
  faq: [
    { q: "¿Qué diferencia a una página corporativa profesional de una amateur?", a: "La infraestructura, la velocidad, la seguridad, la accesibilidad y un diseño propio. Una web profesional carga rápido en cualquier país, se ve igual de bien en celular y está estructurada para Google." },
    { q: "¿Cuánto cuesta un sitio corporativo en Colombia?", a: "Con K&T Code, un sitio corporativo a la medida parte de $2.500.000 COP y se entrega en 15 a 25 días." },
  ],
  sources: [{ title: "web.dev: Web Vitals", url: "https://web.dev/articles/vitals" }],
};

export default post;

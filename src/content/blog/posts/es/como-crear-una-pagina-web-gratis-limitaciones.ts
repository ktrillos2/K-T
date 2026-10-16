import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Las plataformas gratuitas sirven para practicar o para un proyecto personal, pero tienen cuatro límites serios para un negocio.",
    "Subdominio con el nombre de la plataforma, publicidad que no controlas, casi nulo control de SEO y ningún derecho sobre el código.",
    "Si tu web debe vender o generar confianza, conviene una web propia con dominio, velocidad y SEO bajo tu control.",
  ],
  md: `
Muchas plataformas prometen una página web gratis en minutos. Es real, pero lo gratis tiene condiciones que pueden costarte clientes. Antes de elegir, conoce qué ganas y qué pierdes.

## Opciones gratuitas más comunes {#opciones}

- **Constructores visuales** con plan gratuito (arrastrar y soltar).
- **Blogs gratuitos** en plataformas de publicación.
- **Perfiles de empresa** en buscadores y redes sociales.

Los perfiles gratuitos, como el de Google, sí son recomendables para cualquier negocio: complementan tu web, no la reemplazan.

## Las 4 grandes limitaciones {#limitaciones}

1. **Subdominio poco profesional:** tu dirección queda como \`tuempresa.plataforma.com\`. Transmite poca seriedad y no construye autoridad para tu propia marca.
2. **Publicidad obligatoria:** la plataforma muestra su marca o anuncios de terceros en tu sitio.
3. **SEO casi nulo:** no controlas datos estructurados, sitemaps ni velocidad, que son claves para Google y para los asistentes de IA.
4. **El código no es tuyo:** si la plataforma cambia sus condiciones o cierra, puedes perder tu sitio sin forma de migrarlo.

Tabla: Web gratuita frente a web propia.
| Criterio | Web gratuita | Web propia a la medida |
|---|---|---|
| Dirección | Subdominio de la plataforma | Tu dominio (.com, .co) |
| Publicidad | La decide la plataforma | Ninguna |
| SEO | Muy limitado | Control total |
| Velocidad | Depende del plan | Optimizada para cargar en menos de 1 s |
| Propiedad | De la plataforma | Tuya |

## ¿Cuándo sí sirve una web gratis? {#cuando}

- Proyectos escolares, portafolios de práctica o experimentos.
- Validar una idea durante unas semanas antes de invertir.

Para un negocio formal, el ahorro inicial suele salir caro en confianza y en ventas perdidas. Si quieres saber cuánto cuesta la alternativa, mira [cuánto cuesta una página web en Colombia](/blog/cuanto-cuesta-una-pagina-web-en-colombia).

:::checklist id="web-gratis-o-propia" title="¿Necesitas una web propia?"
- Quiero que mis clientes me encuentren en Google
- Necesito un correo y un dominio con el nombre de mi empresa
- Quiero recibir pedidos o cotizaciones desde la web
- No quiero anuncios ajenos en mi sitio
- Quiero que el sitio sea mío si cambio de proveedor
:::

Conoce nuestros [planes y precios](/precios): landing pages desde $450.000 COP, con el código a nombre de tu empresa.
`,
  faq: [
    { q: "¿Es recomendable tener una página web gratis para mi negocio?", a: "Sirve para practicar o validar una idea, pero para un negocio formal genera desconfianza por el subdominio de la plataforma y los anuncios de terceros." },
    { q: "¿Una web gratis puede posicionar en Google?", a: "Es muy difícil: los planes gratuitos no permiten configurar sitemaps avanzados, datos estructurados ni optimizar la velocidad, y no tienen un dominio propio con autoridad." },
  ],
};

export default post;

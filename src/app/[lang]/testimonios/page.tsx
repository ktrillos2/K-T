import type { Metadata } from "next";
import { getDict, projectsFor } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { localize } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Testimonials } from "@/components/landing/Testimonials";
import { getTestimonials } from "@/lib/testimonials";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const c = getDict(lang).landing.testimonials;
  return pageMeta({ lang, path: "/testimonios", title: c.title, description: c.description });
}

export default async function TestimonialsPage({ params }: LangParams) {
  const lang = await langOf(params);
  const c = getDict(lang).landing.testimonials;
  const url = `${SITE.url}${localize("/testimonios", lang)}`;
  const reviews = await getTestimonials();
  const projects = projectsFor(lang);
  return (
    <>
      <Testimonials reviews={reviews} />
      <JsonLd
        data={graph(breadcrumbs(lang, [{ name: c.title, path: "/testimonios" }]), {
          "@type": "CollectionPage",
          "@id": `${url}#page`,
          url,
          name: c.title,
          description: c.description,
          about: { "@id": `${SITE.url}/#organization` },
          hasPart: reviews.map((r) => {
            const p = projects.find((x) => x.slug === r.project);
            return {
              "@type": "Quotation",
              text: r.message,
              ...(r.date ? { dateCreated: r.date } : {}),
              spokenByCharacter: { "@type": "Person", name: r.name, ...(r.role ? { jobTitle: r.role } : {}) },
              about: p ? { "@type": "CreativeWork", name: p.name, url: `${SITE.url}${localize(p.href, lang)}` } : { "@type": "Organization", name: r.projectName },
            };
          }),
        })}
      />
    </>
  );
}

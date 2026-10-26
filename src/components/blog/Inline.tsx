import { Fragment } from "react";
import { TLink } from "@/components/transition/TLink";
import { Price } from "@/components/ui/Price";

const TOKEN = /(\{\{cop:\d+\}\}|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

/**
 * Markdown mínimo en línea: **negrita**, *cursiva*, `código`, [enlace](url) y {{cop:450000}}
 * (precio en pesos que se muestra en la moneda del país elegido, igual que en /precios).
 */
export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        const cop = p.match(/^\{\{cop:(\d+)\}\}$/);
        if (cop) return <Price key={i} cop={Number(cop[1])} />;
        if (p.startsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("`")) return <code key={i}>{p.slice(1, -1)}</code>;
        if (p.startsWith("*")) return <em key={i}>{p.slice(1, -1)}</em>;
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          const [, label, href] = m;
          if (href.startsWith("/") && !/\.(txt|xml)$/.test(href))
            return (
              <TLink key={i} href={href}>
                {label}
              </TLink>
            );
          return (
            <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

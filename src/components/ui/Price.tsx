"use client";

import { useEffect, useRef } from "react";
import { gsap, SCRAMBLE_CHARS, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/i18n/I18nProvider";
import { formatCOP } from "@/lib/money";

/**
 * Precio en la moneda del país elegido. El HTML del servidor trae el valor en COP
 * (lo que indexan los buscadores); al cambiar de país el número se "descifra" al nuevo valor.
 */
export function Price({ cop, className, showCode = true }: { cop: number; className?: string; showCode?: boolean }) {
  const { money, country, t } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const text = country.currency === "COP" ? `${formatCOP(cop)}${showCode ? " COP" : ""}` : `${money(cop)}${showCode ? ` ${country.currency}` : ""}`;
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (first.current && country.currency === "COP") {
      first.current = false;
      return;
    }
    first.current = false;
    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }
    gsap.to(el, { duration: 0.7, scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.9 }, overwrite: true });
  }, [text, country.currency]);

  return (
    <span
      ref={ref}
      className={className}
      title={country.currency === "COP" ? undefined : t.price.converted(country.currency)}
      data-currency={country.currency}
    >
      {`${formatCOP(cop)}${showCode ? " COP" : ""}`}
    </span>
  );
}

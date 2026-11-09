"use client";

import { useEffect, useRef } from "react";
import { gsap, SCRAMBLE_CHARS, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/i18n/I18nProvider";
import { formatCOP } from "@/lib/money";
import { planByPrice } from "@/lib/pricing";

/**
 * Precio en la moneda del país elegido. El HTML del servidor trae COP en español y USD en inglés
 * (lo que indexan los buscadores); al cambiar de país el número se "descifra" al nuevo valor.
 */
export function Price({ cop, usd, className, showCode = true }: { cop: number; usd?: number; className?: string; showCode?: boolean }) {
  const { money, moneyUsd, country, t } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const plan = usd === undefined ? planByPrice(cop) : undefined;
  const code = showCode ? ` ${country.currency}` : "";
  const fixedUsd = usd ?? plan?.usd;
  const abroad = plan && !fixedUsd ? t.price.quote : `${fixedUsd ? moneyUsd(fixedUsd) : money(cop)}${code}`;
  const text = country.currency === "COP" ? `${formatCOP(cop)}${showCode ? " COP" : ""}` : abroad;
  const initial = useRef(text).current;
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (first.current) {
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
      {initial}
    </span>
  );
}

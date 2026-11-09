import type { BrandColor } from "./routes";

export type PlanId = "landing" | "tienda" | "corporativo" | "software";

/** Precios base en pesos colombianos. Los textos de cada plan están en los diccionarios. */
export type Plan = {
  id: PlanId;
  from: number;
  /** Precio fijo fuera de Colombia. Sin este valor, fuera de Colombia el plan se cotiza. */
  usd?: number;
  /** El software se cotiza: el precio es un mínimo de referencia. */
  quote?: boolean;
  color: BrandColor;
  hot?: boolean;
  /** Días de entrega para la calculadora y el constructor de servicios. */
  days: [number, number] | null;
};

export const PLANS: Plan[] = [
  { id: "landing", from: 450000, usd: 200, color: "red", days: [7, 12] },
  { id: "tienda", from: 1300000, usd: 450, color: "yellow", hot: true, days: [25, 40] },
  { id: "corporativo", from: 2500000, color: "green", days: [15, 25] },
  { id: "software", from: 4500000, usd: 1000, quote: true, color: "fg", days: null },
];

/** Plan cuyo precio base en pesos es `cop`; permite que los textos con {{cop:N}} sigan la tarifa en dólares. */
export const planByPrice = (cop: number) => PLANS.find((p) => p.from === cop);

/** Precio para datos estructurados: en inglés solo se publica lo que tiene tarifa en dólares. */
export const offerPrice = (p: Plan, lang: "es" | "en") =>
  lang === "es" ? { amount: p.from, currency: "COP" } : p.usd ? { amount: p.usd, currency: "USD" } : null;

export const planById = (id: PlanId) => PLANS.find((p) => p.id === id)!;

/** Administración de Ads (servicio mensual): pesos en Colombia y dólares fijos en los demás países. */
export const ADS_PRICE = { cop: 450000, usd: 200 } as const;

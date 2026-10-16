import type { BrandColor } from "./routes";

export type PlanId = "landing" | "tienda" | "corporativo" | "software";

/** Precios base en pesos colombianos. Los textos de cada plan están en los diccionarios. */
export type Plan = {
  id: PlanId;
  from: number;
  /** El software se cotiza: el precio es un mínimo de referencia. */
  quote?: boolean;
  color: BrandColor;
  hot?: boolean;
  /** Días de entrega para la calculadora y el constructor de servicios. */
  days: [number, number] | null;
};

export const PLANS: Plan[] = [
  { id: "landing", from: 450000, color: "red", days: [7, 12] },
  { id: "tienda", from: 1300000, color: "yellow", hot: true, days: [25, 40] },
  { id: "corporativo", from: 2500000, color: "green", days: [15, 25] },
  { id: "software", from: 4500000, quote: true, color: "fg", days: null },
];

export const planById = (id: PlanId) => PLANS.find((p) => p.id === id)!;

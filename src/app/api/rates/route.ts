import { NextResponse } from "next/server";
import { FALLBACK_RATES, type Currency, type Rates } from "@/lib/money";

// Se recalcula cada 6 horas en el servidor; el navegador solo consulta este endpoint.
export const revalidate = 21600;

const WANTED: Currency[] = ["COP", "USD", "MXN", "PEN", "ARS", "CLP", "EUR"];

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/COP", { next: { revalidate } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { result?: string; rates?: Record<string, number>; time_last_update_utc?: string };
    if (data.result !== "success" || !data.rates) throw new Error("respuesta inválida");
    const rates: Rates["rates"] = {};
    for (const c of WANTED) if (typeof data.rates[c] === "number") rates[c] = data.rates[c];
    const body: Rates = {
      base: "COP",
      rates,
      updated: data.time_last_update_utc ?? new Date().toUTCString(),
      source: "open.er-api.com",
      fallback: false,
    };
    return NextResponse.json(body, { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json(FALLBACK_RATES, { headers: { "Cache-Control": "public, s-maxage=600" } });
  }
}

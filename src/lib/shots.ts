import { existsSync } from "node:fs";
import { join } from "node:path";

/** true si la captura del proyecto ya fue generada en public/shots (solo en el servidor). */
export const hasShot = (shot: string) => {
  try {
    return existsSync(join(process.cwd(), "public", shot));
  } catch {
    return false;
  }
};

"use client";

import { useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./CopyField.module.css";

/** Dato de contacto seleccionable con botón de copiar. */
export function CopyField({ label, value }: { label: string; value: string }) {
  const [state, setState] = useState<"idle" | "ok" | "sel">("idle");
  const ref = useRef<HTMLSpanElement>(null);
  const { t } = useI18n();

  const copy = () => {
    const done = (s: "ok" | "sel") => {
      setState(s);
      window.setTimeout(() => setState("idle"), 1600);
    };
    const select = () => {
      const el = ref.current;
      if (!el) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      done("sel");
    };
    try {
      navigator.clipboard.writeText(value).then(() => done("ok"), select);
    } catch {
      select();
    }
  };

  return (
    <div className={styles.field}>
      <span className={styles.k}>{label}</span>
      <span ref={ref} className={styles.v}>
        {value}
      </span>
      <button type="button" className={styles.btn} onClick={copy} data-stick data-done={state !== "idle"}>
        {state === "ok" ? t.common.copied : state === "sel" ? t.common.selected : t.common.copy}
      </button>
    </div>
  );
}

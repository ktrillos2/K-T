"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ProjectView } from "@/lib/projects";
import styles from "./ProjectPicker.module.css";

type Props = {
  projects: ProjectView[];
  value: string;
  onChange: (slug: string) => void;
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  empty: string;
  count: (n: number) => string;
};

/** Minúsculas y sin tildes, para que "aerolinea" encuentre "Aerolínea". */
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Selector de proyecto con búsqueda (combobox accesible): botón que abre un panel
 * con buscador, miniatura de cada sitio, nombre y sector. Teclado: ↑ ↓ Enter Esc.
 */
export function ProjectPicker({ projects, value, onChange, label, placeholder, searchPlaceholder, empty, count }: Props) {
  const id = useId();
  const listId = `${id}-list`;
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const selected = projects.find((p) => p.slug === value);
  const results = useMemo(() => {
    const n = norm(q.trim());
    if (!n) return projects;
    return projects.filter((p) => norm(`${p.name} ${p.sector} ${p.location}`).includes(n));
  }, [projects, q]);

  // Al abrir: enfoca el buscador y marca el proyecto elegido (o el primero).
  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(Math.max(0, projects.findIndex((p) => p.slug === value)));
    requestAnimationFrame(() => input.current?.focus());
  }, [open, projects, value]);

  // Cierra al hacer clic fuera.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Mantiene visible la opción activa al moverse con el teclado.
  useEffect(() => {
    if (!open) return;
    list.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const pick = (slug: string) => {
    onChange(slug);
    setOpen(false);
    trigger.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const p = results[active];
      if (p) pick(p.slug);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      trigger.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className={styles.root} data-open={open}>
      <span className={styles.label} id={`${id}-label`}>
        {label}
      </span>
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {selected?.thumb ? <img className={styles.thumb} src={selected.thumb} alt="" width={40} height={25} /> : <span className={styles.dot} aria-hidden="true" />}
        <span id={`${id}-value`} className={selected ? styles.value : styles.placeholder}>
          {selected ? selected.name : placeholder}
        </span>
        <span className={styles.chev} aria-hidden="true" />
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.search}>
            <span className={styles.prompt} aria-hidden="true">
              &gt;
            </span>
            <input
              ref={input}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={results[active] ? `${id}-o-${results[active].slug}` : undefined}
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKey}
              autoComplete="off"
              spellCheck={false}
            />
            <span className={`tnum ${styles.count}`}>{count(results.length)}</span>
          </div>
          <ul ref={list} id={listId} role="listbox" aria-labelledby={`${id}-label`} className={styles.list}>
            {results.length === 0 && <li className={styles.empty}>{empty}</li>}
            {results.map((p, i) => (
              <li
                key={p.slug}
                id={`${id}-o-${p.slug}`}
                role="option"
                aria-selected={p.slug === value}
                data-i={i}
                data-active={i === active}
                className={styles.option}
                onPointerMove={() => setActive(i)}
                onClick={() => pick(p.slug)}
              >
                {p.thumb ? <img className={styles.thumb} src={p.thumb} alt="" width={40} height={25} loading="lazy" decoding="async" /> : <span className={styles.thumb} aria-hidden="true" />}
                <span className={styles.text}>
                  <b>{p.name}</b>
                  <small>
                    {p.sector} · {p.dateLabel}
                  </small>
                </span>
                {p.slug === value && (
                  <span className={styles.check} aria-hidden="true">
                    ✓
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

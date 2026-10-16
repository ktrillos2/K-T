"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { wa } from "@/lib/site";
import styles from "./ReviewForm.module.css";

type Status = "idle" | "sending" | "sent" | "failed";

/**
 * Formulario para dejar una reseña: solo proyecto, nombre y mensaje.
 * Se envía a /api/reviews, que la guarda como "pendiente" en Sanity (y avisa por correo).
 * Se publica cuando se aprueba.
 */
export function ReviewForm() {
  const { t, lang } = useI18n();
  const f = t.landing.testimonials.form;
  const projects = useMemo(() => projectsFor(lang).slice().sort((a, b) => a.name.localeCompare(b.name, "es")), [lang]);
  const [project, setProject] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || name.trim().length < 2 || message.trim().length < 10) {
      setError(f.invalid);
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project, name: name.trim(), message: message.trim(), website: trap, lang }),
      });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const reset = () => {
    setProject("");
    setName("");
    setMessage("");
    setStatus("idle");
  };

  return (
    <section id="dejar-resena" className={`wrap ${styles.wrap}`} aria-labelledby="h-review-form">
      <div className={styles.copy}>
        <p className={styles.path}>
          <span>{"//"}</span> {f.path}
        </p>
        <h2 id="h-review-form" className={`display ${styles.title}`}>
          {f.title}
        </h2>
        <p className="lead">{f.lead}</p>
      </div>

      {status === "sent" ? (
        <div className={styles.done} role="status">
          <span className={styles.check} aria-hidden="true">
            ✓
          </span>
          <p>{f.ok}</p>
          <button type="button" className={styles.again} onClick={reset}>
            {f.another}
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={submit} noValidate>
          <label className={styles.field}>
            <span>{f.project}</span>
            <select value={project} onChange={(e) => setProject(e.target.value)} required>
              <option value="" disabled>
                {f.projectPh}
              </option>
              {projects.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>{f.name}</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={f.namePh} maxLength={80} autoComplete="name" required />
          </label>
          <label className={styles.field}>
            <span>{f.message}</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={f.messagePh} maxLength={800} rows={5} required />
            <small className="tnum">{message.length} / 800</small>
          </label>
          {/* Campo trampa: invisible para personas */}
          <input className={styles.trap} type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} aria-hidden="true" name="website" />
          {(error || status === "failed") && (
            <p className={styles.error} role="alert">
              {error || f.error}{" "}
              {status === "failed" && (
                <a href={wa(lang === "en" ? `Hi K&T Code, I'd like to leave a review: ${message}` : `Hola K&T Code, quiero dejar una reseña: ${message}`)} target="_blank" rel="noopener noreferrer">
                  WhatsApp ↗
                </a>
              )}
            </p>
          )}
          <button type="submit" className={styles.send} disabled={status === "sending"} data-stick>
            <span>{status === "sending" ? f.sending : f.send}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
      )}
    </section>
  );
}

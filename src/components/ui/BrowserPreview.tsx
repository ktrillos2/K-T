"use client";

import { useState } from "react";
import type { ProjectView } from "@/lib/projects";
import { cx } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { vars } from "@/lib/utils";
import { SiteShot } from "./SiteShot";
import { LiveModal, DEVICE_WIDTH, type Device } from "./LiveModal";
import styles from "./BrowserPreview.module.css";

type Props = { project: ProjectView; className?: string; priority?: boolean };

/**
 * Navegador en miniatura con la captura real del sitio (escritorio, tablet o móvil).
 * Encima, un botón "Ver en vivo" abre el sitio real en una ventana enfocada.
 */
export function BrowserPreview({ project, className, priority }: Props) {
  const { t } = useI18n();
  const f = t.home.featured;
  const [device, setDevice] = useState<Device>("desktop");
  const [live, setLive] = useState(false);

  return (
    <div className={cx(styles.wrap, className)} data-device={device}>
      <div className={styles.toolbar}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>
          <span className={styles.lock} aria-hidden="true">
            ●
          </span>
          {project.domain ?? project.slug}
        </span>
        <div className={styles.devices} role="group" aria-label={f.devices.desktop}>
          {(Object.keys(DEVICE_WIDTH) as Device[]).map((d) => (
            <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)} className={styles.device} title={f.devices[d]}>
              <span className={styles[`ico_${d}`]} aria-hidden="true" />
              <span className="sr-only">{f.devices[d]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.viewport} style={!project.hasShot && project.coverRatio ? vars({ "--vr": project.coverRatio.toFixed(4) }) : undefined}>
          <SiteShot project={project} device={device === "mobile" ? "mobile" : "desktop"} className={styles.shot} priority={priority} fit="frame" />
          {project.site && (
            <button type="button" className={styles.liveBtn} onClick={() => setLive(true)} data-cursor={f.liveToggle}>
              <i aria-hidden="true" />
              {f.liveToggle}
            </button>
          )}
        </div>
      </div>

      {live && <LiveModal project={project} device={device} onDevice={setDevice} onClose={() => setLive(false)} />}
    </div>
  );
}

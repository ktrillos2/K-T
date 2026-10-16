import type { ProjectView } from "@/lib/projects";
import { COLOR_VAR } from "@/lib/routes";
import { cx, vars } from "@/lib/utils";
import styles from "./ProjectCover.module.css";

/** Portada generativa de un proyecto: patrón + color de la marca + iniciales pixel. */
export function ProjectCover({ project, className, size = "md" }: { project: ProjectView; className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <div
      className={cx(styles.cover, styles[project.pattern], styles[size], className)}
      style={vars({ "--c": COLOR_VAR[project.color] })}
      aria-hidden="true"
    >
      <span className={styles.initials}>{project.initials}</span>
    </div>
  );
}

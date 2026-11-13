import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./SectionHead.module.css";

type Props = {
  /** Etiqueta corta sobre el título (p. ej. "servicios"). */
  path: string;
  title: string;
  lead?: React.ReactNode;
  id?: string;
};

/** Encabezado de sección: etiqueta, título pixel y bajada. */
export function SectionHead({ path, title, lead, id }: Props) {
  return (
    <header className={styles.head}>
      <div className={styles.left}>
        <p className={styles.path}>
          <span className={styles.slash} aria-hidden="true">
            ●
          </span>{" "}
          {path}
        </p>
        <SplitTitle as="h2" id={id} className="h-sec">
          {title}
        </SplitTitle>
      </div>
      {lead && (
        <Reveal className={styles.lead}>
          <p className="lead">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}

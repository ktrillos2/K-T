import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import styles from "./SectionHead.module.css";

type Props = {
  /** Ruta tipo editor: "src/app/page.tsx › servicios". */
  path: string;
  title: string;
  lead?: React.ReactNode;
  id?: string;
};

/** Encabezado de sección: breadcrumb de archivo, título pixel y bajada. */
export function SectionHead({ path, title, lead, id }: Props) {
  return (
    <header className={styles.head}>
      <div className={styles.left}>
        <p className={styles.path}>
          <span className={styles.slash} aria-hidden="true">
            {"//"}
          </span>{" "}
          <Scramble text={path} />
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

import { cx } from "@/lib/utils";
import styles from "./MacWindow.module.css";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  footer?: React.ReactNode;
};

/** Ventana estilo macOS: el marco común de código, terminales y tarjetas. */
export function MacWindow({ title, children, className, bodyClassName, footer }: Props) {
  return (
    <div className={cx(styles.win, className)}>
      <div className={styles.bar}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={cx(styles.body, bodyClassName)}>{children}</div>
      {footer && <div className={styles.foot}>{footer}</div>}
    </div>
  );
}

import { testimonialRating } from "@/content/testimonials";
import styles from "./ReviewRating.module.css";

/** Las reseñas sin calificación no muestran estrellas; las fracciones conservan su valor. */
export function ReviewRating({ rating }: { rating?: number }) {
  const value = testimonialRating(rating);
  if (value === undefined) return null;
  return (
    <span className={styles.rating} role="img" aria-label={`${value}/5`}>
      <span aria-hidden="true">☆☆☆☆☆</span>
      <span className={styles.fill} style={{ width: `${value / 5 * 100}%` }} aria-hidden="true">★★★★★</span>
    </span>
  );
}

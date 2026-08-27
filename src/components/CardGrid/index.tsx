import React, {type ReactNode} from "react";
import styles from "./styles.module.css";

/** Responsive grid wrapper for `<Card>` elements in MDX documentation pages. */
export type CardGridProps = {
  /** One or more `<Card>` elements. */
  children: ReactNode;
};

export default function CardGrid({children}: CardGridProps): React.JSX.Element {
  return <div className={styles.grid}>{children}</div>;
}

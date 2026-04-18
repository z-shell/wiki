import React, {type ReactNode} from "react";
import styles from "./styles.module.css";

/** Inline text highlighter with a custom background color. */
export type HighlightProps = {
  /** Content to highlight. */
  children: ReactNode;
  /** Any valid CSS color value (e.g. `"#25c2a0"`, `"var(--ifm-color-primary)"`). */
  color: string;
};

export default function Highlight({children, color}: HighlightProps): React.JSX.Element {
  return (
    <span className={styles.highlight} style={{backgroundColor: color}}>
      {children}
    </span>
  );
}

import React, {type ReactNode} from "react";
import styles from "./styles.module.css";

export type HighlightProps = {
  children: ReactNode;
  color: string;
};

export default function Highlight({children, color}: HighlightProps): React.JSX.Element {
  return (
    <span className={styles.highlight} style={{backgroundColor: color}}>
      {children}
    </span>
  );
}

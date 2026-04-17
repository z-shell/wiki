import React from "react";
import styles from "./Spinner.module.css";

export default function Spinner(): React.JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} role="status" aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
}

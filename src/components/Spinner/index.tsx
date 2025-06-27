import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {SpinnerProps} from "../../types";

/**
 * Spinner component that displays a loading indicator
 */
export default function Spinner({size = "medium", color = "primary", className}: SpinnerProps): React.JSX.Element {
  return (
    <div
      className={clsx(styles.spinner, styles[size], styles[color], className)}
      role='status'
      aria-live='polite'
      data-testid='spinner'>
      <div className={styles.spinnerDot}></div>
      <span className={styles.srOnly}>Loading</span>
    </div>
  );
}

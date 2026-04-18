import React from "react";
import styles from "./styles.module.css";

export type SpinnerProps = {
  size?: "small" | "medium" | "large";
};

const SIZES = {small: 48, medium: 200, large: 300} as const;

export default function Spinner({size = "medium"}: SpinnerProps): React.JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.spinner}
        style={{"--spinner-size": `${SIZES[size]}px`} as React.CSSProperties}
        role="status"
        aria-label="Loading"
        data-testid="loader"
      />
    </div>
  );
}

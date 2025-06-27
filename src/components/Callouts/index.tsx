import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import NoteIcon from "./NoteIcon";
import TipIcon from "./TipIcon";
import WarningIcon from "./WarningIcon";
import type {CalloutProps} from "../../types";

export function Note({children, className, title = "Note"}: CalloutProps): React.JSX.Element {
  return (
    <div className={clsx(styles.callout, styles.note, className)}>
      <div className={styles.calloutHeader}>
        <NoteIcon />
        <span className={styles.calloutTitle}>{title}</span>
      </div>
      <div className={styles.calloutContent}>{children}</div>
    </div>
  );
}

export function Tip({children, className, title = "Tip"}: CalloutProps): React.JSX.Element {
  return (
    <div className={clsx(styles.callout, styles.tip, className)}>
      <div className={styles.calloutHeader}>
        <TipIcon />
        <span className={styles.calloutTitle}>{title}</span>
      </div>
      <div className={styles.calloutContent}>{children}</div>
    </div>
  );
}

export function Warning({children, className, title = "Warning"}: CalloutProps): React.JSX.Element {
  return (
    <div className={clsx(styles.callout, styles.warning, className)}>
      <div className={styles.calloutHeader}>
        <WarningIcon />
        <span className={styles.calloutTitle}>{title}</span>
      </div>
      <div className={styles.calloutContent}>{children}</div>
    </div>
  );
}

import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {TerminalOutputProps} from "../../types";

/**
 * Component for displaying formatted terminal output
 */
export default function TerminalOutput({
  children,
  className,
  title = "Output",
}: TerminalOutputProps): React.JSX.Element {
  return (
    <div className={clsx(styles.terminalOutput, className)}>
      {title && (
        <div className={styles.header}>
          <span>{title}</span>
        </div>
      )}
      <pre className={styles.pre}>
        <code className={styles.code}>{children}</code>
      </pre>
    </div>
  );
}

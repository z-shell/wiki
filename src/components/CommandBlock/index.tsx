import React, {useState} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {CommandBlockProps} from "../../types";

/**
 * A component for displaying shell commands with a copy button
 */
export default function CommandBlock({
  children,
  className,
  prompt = "$",
  language = "shell",
}: CommandBlockProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={clsx(styles.commandBlock, className)}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <button className={styles.copyButton} onClick={handleCopy} aria-label='Copy to clipboard'>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className={styles.pre}>
        <code className={styles.code}>
          <span className={styles.prompt}>{prompt} </span>
          {children}
        </code>
      </pre>
    </div>
  );
}

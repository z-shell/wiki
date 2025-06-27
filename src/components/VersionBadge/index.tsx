import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {VersionBadgeProps} from "../../types";

/**
 * A badge component to indicate version compatibility
 */
export default function VersionBadge({version, className, type}: VersionBadgeProps): React.JSX.Element {
  return <span className={clsx(styles.badge, type && styles[type], className)}>{version}</span>;
}

import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {COMMON_LINKS} from "./linkRegistry";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {LinkRefProps} from "../../types";

/**
 * Component for referencing common links from a centralized registry
 *
 * This component allows you to reference predefined links from a central registry,
 * making link management more consistent across the documentation.
 *
 * @example
 * ```jsx
 * <LinkRef to="commands">View Commands</LinkRef>
 * <LinkRef to="configs-playground" variant="button">Try the Playground</LinkRef>
 * ```
 */
export default function LinkRef({
  to,
  children,
  newTab,
  variant = "default",
  className,
  title,
  id,
  ...rest
}: LinkRefProps): React.JSX.Element {
  // Type assertion for string key to access the registry
  const linkInfo = COMMON_LINKS[to as keyof typeof COMMON_LINKS];

  if (!linkInfo) {
    console.warn(`Link reference "${String(to)}" not found in registry`);
    return <>{children || String(to)}</>;
  }

  const {url, external} = linkInfo;
  const finalUrl = external ? url : useBaseUrl(url);
  const isNewTab = newTab ?? external;

  return (
    <Link
      to={finalUrl}
      className={clsx(
        styles.linkRef,
        {
          [styles.button]: variant === "button",
          [styles.subtle]: variant === "subtle",
          [styles.external]: external,
        },
        className,
      )}
      target={isNewTab ? "_blank" : undefined}
      rel={isNewTab ? "noopener noreferrer" : undefined}
      title={title || linkInfo.description}
      id={id}
      data-testid='link-ref'
      {...rest}>
      {children || String(to)}
    </Link>
  );
}

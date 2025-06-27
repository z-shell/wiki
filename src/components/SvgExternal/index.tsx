import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {SvgExternalProps} from "../../types";

/**
 * Component for embedding external SVGs with proper styling and accessibility.
 *
 * This component is designed to work with externally hosted SVGs, especially
 * those that are dynamically updated from sources like GitHub metrics.
 *
 * @example
 * ```jsx
 * <SvgExternal
 *   url="https://example.com/chart.svg"
 *   alt="Monthly activity chart"
 *   height="300px"
 * />
 * ```
 */
export default function SvgExternal({
  url,
  alt,
  href,
  width = "100%",
  height = "auto",
  className,
  title,
  style,
}: SvgExternalProps): React.JSX.Element {
  // Generate a unique ID for the title if provided
  const titleId = title ? `svg-external-title-${title.replace(/\s+/g, "-").toLowerCase()}` : undefined;

  const content = (
    <div
      style={{
        width,
        height,
        background: `url(${url}) no-repeat center center`,
        backgroundSize: "cover",
        ...style,
      }}
      className={clsx(styles.svgExternal, className)}
      aria-label={title ? undefined : alt}
      aria-labelledby={titleId}
      role='img'
      data-testid='svg-external'>
      {title && (
        <span id={titleId} className='sr-only'>
          {title}
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {SvgProps} from "../../types/components/ui";

/**
 * SVG icon component with customizable size and color
 */
export default function Svg({
  svgClass,
  colorAttr,
  children,
  color = "inherit",
  size = "medium",
  viewBox = "0 0 24 24",
  title,
  className,
  ...rest
}: SvgProps): React.JSX.Element {
  const titleId = title ? `svg-title-${title.replace(/\s+/g, "-").toLowerCase()}` : undefined;

  return (
    <svg
      viewBox={viewBox}
      color={colorAttr}
      aria-hidden={title ? undefined : true}
      aria-labelledby={titleId}
      role={title ? "img" : undefined}
      className={clsx(styles.svgIcon, styles[color], styles[size], svgClass, className)}
      data-testid='svg'
      {...rest}>
      {title && <title id={titleId}>{title}</title>}
      {children}
    </svg>
  );
}

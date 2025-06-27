import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {IconProps} from "@site/types";

/**
 * Icon component that displays Font Awesome icons
 */
export default function Icon({name, className, spin, pulse, size, title}: IconProps): React.JSX.Element | null {
  return (
    <i
      className={clsx(
        "fa-solid",
        `fa-${name}`,
        {
          [styles.spin]: spin,
          [styles.pulse]: pulse,
          [styles[size]]: size,
        },
        className,
      )}
      title={title}
      aria-hidden={!title}
      data-testid='icon'
    />
  );
}

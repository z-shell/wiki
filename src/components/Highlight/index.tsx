import React, {memo} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import {HighlightProps} from "../../types";

/**
 * Highlight component that emphasizes text with a colored background
 *
 * @example
 * <Highlight>Default primary highlight</Highlight>
 *
 * @example
 * <Highlight color="warning">Warning highlight</Highlight>
 *
 * @example
 * <Highlight color="danger" title="Error highlight">Error</Highlight>
 */
function Highlight({children, color = "primary", className, title}: HighlightProps): React.JSX.Element {
  return (
    <span className={clsx(styles.highlight, styles[color], className)} data-testid='highlight' title={title}>
      {children}
    </span>
  );
}

export default memo(Highlight);

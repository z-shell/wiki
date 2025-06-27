import React, {memo} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import emojiMap from "./emojiMap";
import {EmojiProps} from "../../types";

/**
 * Emoji component for consistent emoji rendering across platforms
 *
 * @example
 * // Using named emoji from emojiMap
 * <Emoji name="rocket" />
 *
 * @example
 * // With custom label for accessibility
 * <Emoji name="warning" label="Warning symbol" />
 *
 * @example
 * // With custom styling
 * <Emoji name="fire" className="custom-emoji" />
 */
function Emoji({name, symbol, className, label}: EmojiProps): React.JSX.Element {
  const emoji = symbol || emojiMap[name] || "❓";
  const accessibleLabel = label || name;

  return (
    <span className={clsx(styles.emoji, className)} role='img' aria-label={accessibleLabel} data-testid='emoji'>
      {emoji}
    </span>
  );
}

export default memo(Emoji);

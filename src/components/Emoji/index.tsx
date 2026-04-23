/**
 * The symbol, which will be a string containing the emoji, is passed into the returned span.
 * The role is the same in the previous example, and class for styling.
 * Emoji component:
 * Emoji symbol="🐑" label="sheep"/>
 * Emoji symbol="🐑"/>
 */

import React, {type HTMLAttributes} from "react";

export type EmojiProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
  symbol: string;
};

export default function Emoji({label, symbol, ...rest}: EmojiProps): React.JSX.Element {
  return (
    <span aria-hidden={label != null ? undefined : true} aria-label={label ?? undefined} {...rest}>
      {symbol}
    </span>
  );
}

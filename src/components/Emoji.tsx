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
  style?: string;
  symbol: string;
};

export default function Emoji(props: EmojiProps): React.JSX.Element {
  const {label, symbol, ...rest} = props;
  return (
    <span aria-hidden={label != null ? undefined : true} aria-label={label ?? undefined} {...rest}>
      {symbol}
    </span>
  );
}

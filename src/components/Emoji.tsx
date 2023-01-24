/**
 * The symbol, which will be a string containing the emoji, is passed into the returned span.
 * The role is the same in the previous example, and class for styling.
 * Emoji component:
 * Emoji symbol="🐑" label="sheep"/>
 * Emoji symbol="🐑"/>
 *
 * @format
 */

import React, {type HTMLAttributes} from "react";

export interface EmojiProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  symbol: string;
}

export default function Emoji(props: EmojiProps) {
  const {label, symbol, ...rest} = props;
  return (
    <span aria-hidden={label != null ? undefined : true} aria-label={label ?? undefined} {...rest} role='img'>
      {symbol}
    </span>
  );
}

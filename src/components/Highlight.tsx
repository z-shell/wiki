// @ts-check

import React, {type ReactNode} from "react";

export default function Highlight({children, color}: {children: ReactNode; color: string}): React.JSX.Element {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: "0.2rem",
        padding: "0 0.1rem",
        fontWeight: "bold",
        color: "var(--ifm-color-black)",
      }}>
      {children}
    </span>
  );
}

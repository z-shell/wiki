/** @format */

import React from "react";

export default function Highlight({ children }) {
  return (
    <span
      style={{
        backgroundColor: "var(--ifm-color-primary)",
        borderRadius: "0.2rem",
        color: "var(--ifm-color-white)",
        padding: "0.1rem",
        fontWeight: "bold",
      }}
    >
      {children}
    </span>
  );
}

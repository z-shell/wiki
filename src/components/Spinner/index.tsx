/** @format */
// @ts-check

import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./styles.module.css";

export default function Spinner(): JSX.Element {
  const loading = useState(true);
  const color = useState("#ffffff");
  return (
    <div className={styles.loading}>
      <ClipLoader
        color={color}
        loading={loading}
        size={160}
      />
    </div>
  );
}

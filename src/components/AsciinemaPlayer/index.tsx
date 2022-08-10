/** @format */
// @ts-check

import React from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";
import styles from "./styles.module.css";

const Library = Loadable(
  () => import("@site/src/components/AsciinemaPlayer/Library")
);

export default function AsciinemaPlayer({ ...props }): JSX.Element {
  return (
    <div className={styles.asciicast}>
      <Library
        fallback={<Spinner />}
        {...props}
      />
    </div>
  );
}

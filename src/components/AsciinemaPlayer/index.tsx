/** @format */

import React from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";
import styles from "./styles.module.css";

const Library = Loadable(
  () => import("@site/src/components/AsciinemaPlayer/Library")
);

export default function Asciicast({ src, ...props }): JSX.Element {
  return (
    <div className='container'>
      <div className={styles.asciicast}>
        <Library
          fallback={<Spinner />}
          src={src}
          {...props}
        />
      </div>
    </div>
  );
}

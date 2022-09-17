/** @format */

import React from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";
import { PlayerProps } from "./Core";
import styles from "./styles.module.css";

function Load(spinner: () => Promise<typeof import("./Core")>) {
  return Loadable(spinner, { fallback: <Spinner /> });
}

export default function Player(props: PlayerProps): JSX.Element {
  const { src, ...rest } = props;
  const Library = Load(() => import(/* webpackPrefetch: true */ "./Core"));
  return (
    <React.StrictMode>
      <span className={styles.asciinema}>
        <Library
          src={src}
          {...rest}
        />
      </span>
    </React.StrictMode>
  );
}

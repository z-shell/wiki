/** @format */
// @ts-check

import React, { type ReactNode } from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";
import styles from "./styles.module.css";

type PlayerProps = {
  src: string;
  cols: number;
  rows: number;
  autoPlay?: boolean;
  preload?: boolean;
  loop?: boolean | number;
  startAt?: number | string;
  speed?: number;
  idleTimeLimit?: number;
  theme?: string;
  poster?: string;
  fit?: string;
  fontSize?: string;
  children?: ReactNode;
};

function Load(spinner) {
  return Loadable(spinner, { fallback: <Spinner /> });
}

const Library = Load(
  () => import("@site/src/components/AsciinemaPlayer/Library")
);

export default function AsciinemaPlayer({
  src,
  children,
  ...props
}: PlayerProps): JSX.Element {
  return (
    <span>
      <div className={styles.asciinema}>
        <div className={styles.asciinemaBorder}>
          <Library
            src={src}
            {...props}
          />
          {children}
        </div>
      </div>
    </span>
  );
}

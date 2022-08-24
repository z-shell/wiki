/** @format */
// @ts-check

import React from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";
import "asciinema-player/dist/bundle/asciinema-player.css";
import styles from "./styles.module.css";

const Library = Loadable(
  () => import("@site/src/components/AsciinemaPlayer/Library")
);

export default function AsciinemaPlayer({ ...props }): JSX.Element {
  return (
    <span>
      <div className='ScreenView'>
        <Library
          className={styles.asciicast}
          fallback={<Spinner />}
          {...props}
        />
      </div>
    </span>
  );
}

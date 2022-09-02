import React from "react";
import Loadable from "@loadable/component";
import { BaseStyles, Box } from "@primer/react";
import Spinner from "@site/src/components/Spinner";
import { PlayerProps } from "./Core";
import "asciinema-player/dist/bundle/asciinema-player.css";
import styles from "./styles.module.css";

function Load(spinner: () => Promise<typeof import("./Core")>) {
  return Loadable(spinner, { fallback: <Spinner /> });
}

const Library = Load(() => import(/* webpackPrefetch: true */ "./Core"));

export default function Player({
  src,
  children,
  ...options
}: PlayerProps): JSX.Element {
  return (
    <BaseStyles>
      <Box>
        <div className={styles.asciinema}>
          <div className={styles.asciinemaBorder}>
            <Library
              src={src}
              {...options}
            />
          </div>
          {children}
        </div>
      </Box>
    </BaseStyles>
  );
}

import React, { type ReactNode, useState } from "react";
import Loadable from "@loadable/component";
import { BaseStyles, Box } from "@primer/react";
import Spinner from "@site/src/components/Spinner";
import "asciinema-player/dist/bundle/asciinema-player.css";
import styles from "./styles.module.css";

function Load(spinner: () => Promise<typeof import("./Core")>) {
  return Loadable(spinner, { fallback: <Spinner /> });
}

const Library = Load(() => import("./Core"));

export default function Player({
  src,
  children,
  ...options
}: {
  src: string;
  cols: number;
  rows: number;
  speed?: number;
  loop?: boolean;
  preload?: boolean;
  autoplay?: boolean;
  theme?: string;
  idleTimeLimit?: number;
  children?: ReactNode;
}): JSX.Element {
  const [loading] = useState(true);
  return (
    <BaseStyles>
      <Box>
        <div className={styles.asciinema}>
          <div className={styles.asciinemaBorder}>
            <Library
              src={src}
              loading={loading}
              {...options}
            />
            {children}
          </div>
        </div>
      </Box>
    </BaseStyles>
  );
}

import React, {useCallback, useEffect, useRef} from "react";
import Spinner from "../Spinner";
import "asciinema-player/dist/bundle/asciinema-player.css";
import {useAsync} from "@site/src/hooks/useAsync";
import type {Player as AsciinemaPlayer} from "asciinema-player";
import type {PlayerProps} from "@site/types";
import styles from "./styles.module.css";
import clsx from "clsx";

/**
 * Player component for asciinema terminal recordings
 */
export default function Player({src, className, ...rest}: PlayerProps): React.JSX.Element {
  const element = useRef<HTMLDivElement>(null);
  const loadPlayerModule = useCallback(() => import("asciinema-player"), []);
  const {data: playerModule, error} = useAsync<typeof import("asciinema-player")>(loadPlayerModule, true);

  // No need for useMemo if rest is shallow and not frequently changing
  const opts = rest;

  useEffect(() => {
    const currentRef = element.current;
    if (!playerModule || !currentRef) return;

    const instance: AsciinemaPlayer = playerModule.create(src, currentRef, opts);

    return () => {
      instance?.dispose();
    };
  }, [src, opts, playerModule]);

  if (error) {
    return (
      <div className={clsx(styles.playerWrapper, className)} role='alert' aria-live='polite'>
        Failed to load player.
      </div>
    );
  }

  return (
    <div className={clsx(styles.playerWrapper, className)} aria-label='asciinema terminal recording player'>
      {playerModule ? <div ref={element} className={styles.player} /> : <Spinner />}
    </div>
  );
}

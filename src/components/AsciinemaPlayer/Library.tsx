/** @format */
// @ts-check

import React, { useRef, useEffect } from "react";
import * as AsciinemaLibrary from "asciinema-player";
import "asciinema-player/dist/bundle/asciinema-player.css";

export default function Library({
  src,
  ...options
}: {
  src: string;
  options: AsciinemaLibrary.PlayerOptions;
}): JSX.Element {
  const asciinemaContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentPlayer = asciinemaContainer.current;
    AsciinemaLibrary.create(src, currentPlayer, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return <div ref={asciinemaContainer} />;
}

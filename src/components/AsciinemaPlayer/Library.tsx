/** @format */
// @ts-check

import React, { type ReactNode, useRef, useState, useEffect } from "react";
import * as AsciinemaLibrary from "asciinema-player";
import "asciinema-player/dist/bundle/asciinema-player.css";

export default function Library({
  src,
  children,
  ...options
}: {
  src: string;
  children?: ReactNode;
  options?: AsciinemaLibrary.PlayerOptions;
}): JSX.Element {
  const asciinemaContainer = useRef<HTMLDivElement>(null);
  const [playing, isPlaying] = useState(null);
  useEffect(() => {
    const currentPlayer = asciinemaContainer.current;
    const player = AsciinemaLibrary.create(src, currentPlayer, options);
    return () => {
      isPlaying(() => {
        player.dispose();
      }, false);
      isPlaying(() => {
        player.play();
      }, true);
    };
  }, [src, playing, options]);
  return <div ref={asciinemaContainer}>{children}</div>;
}

/** @format */
// @ts-check

import React, { useRef, useEffect } from "react";
import * as AsciinemaPlayer from "asciinema-player";

interface PlayerProps {
  src: string;
  // START asciinemaOptions
  cols: number;
  rows: number;
  autoPlay: boolean;
  preload: boolean;
  loop: boolean | number;
  startAt: number | string;
  speed: number;
  idleTimeLimit: number;
  theme: string;
  poster: string;
  fit: string;
  terminalFontSize: string;
  terminalFontFamily: string;
  terminalLineHeight: number;
  // END asciinemaOptions
}

export default function Library({
  src,
  ...asciinemaOptions
}: PlayerProps): JSX.Element {
  const containerElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentRef = containerElement.current;
    AsciinemaPlayer.create(src, currentRef, asciinemaOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return <div ref={containerElement} />;
}

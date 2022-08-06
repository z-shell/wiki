/** @format */
// @ts-check

import React, { useEffect, useRef } from "react";
import * as AsciinemaPlayerLibrary from "asciinema-player";
import "asciinema-player/dist/bundle/asciinema-player.css";

type AsciinemaPlayerProps = {
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
};

export default function AsciinemaPlayer({
  src,
  ...asciinemaOptions
}: AsciinemaPlayerProps): JSX.Element {
  const containerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = containerElement.current;
    AsciinemaPlayerLibrary.create(src, currentRef, asciinemaOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return <div ref={containerElement} />;
}

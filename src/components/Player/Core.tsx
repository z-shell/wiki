/** @format */

import React, { useEffect, useRef } from "react";
import * as AsciinemaLibrary from "asciinema-player";
import "asciinema-player/dist/bundle/asciinema-player.css";

export interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
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
  terminalLineHeight?: number;
  terminalFontFamily?: string;
  terminalFontSize?: string;
}

export default function AsciinemaPlayer(props: PlayerProps): JSX.Element {
  const { src, ...rest } = props;
  const playerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = playerElement.current;
    const player = AsciinemaLibrary.create(src, currentRef, rest);

    return () => {
      player.dispose();
    };
  }, [src, rest]);

  return <div ref={playerElement} />;
}

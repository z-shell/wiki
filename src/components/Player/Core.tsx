import React, { type ReactNode, useState, useEffect, useRef } from "react";
import * as AsciinemaLibrary from "asciinema-player";

export type PlayerProps = {
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
  children?: ReactNode;
};

export default function AsciinemaPlayer({
  src,
  ...opts
}: PlayerProps): JSX.Element {
  const playerElement = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const currentRef = playerElement.current;
    const player = AsciinemaLibrary.create(src, currentRef, opts);

    return () => {
      if (!playing) {
        player.play();
        setPlaying(true);
      }
      player.dispose();
      setPlaying(false);
    };
  }, [src, opts, playing]);

  return <div ref={playerElement} />;
}

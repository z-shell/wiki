import React, { useEffect, useRef } from "react";
import * as AsciinemaLibrary from "asciinema-player";

type Props = {
  src: string;
  cols: string;
  rows: string;
  autoPlay: boolean;
  preload: boolean;
  loop: boolean | number;
  startAt: number | string;
  speed: number;
  idleTimeLimit: number;
  theme: string;
  poster: string;
  fit: string;
  fontSize: string;
};

function AsciinemaPlayer({ src, ...opts }: Props): JSX.Element {
  const playerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = playerElement.current;
    const player = AsciinemaLibrary.create(src, currentRef, opts);
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [src, opts]);

  return (
    <div
      className='AsciinemaPlayer'
      ref={playerElement}
    />
  );
}

export default AsciinemaPlayer;

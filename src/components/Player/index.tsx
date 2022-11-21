/** @format */

import React, {useEffect, useRef, useState} from "react";
import Spinner from "@site/src/components/Spinner";
import "asciinema-player/dist/bundle/asciinema-player.css";

type PlayerProps = {
  src: string;
  cols?: number;
  rows?: number;
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
};

export default function AsciinemaPlayer({src, ...options}: PlayerProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import("asciinema-player")>();

  useEffect(() => {
    import("asciinema-player").then((module) => {
      setPlayer(module);
    });
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    const instance = player?.create(src, currentRef, options);

    return () => {
      instance?.dispose();
    };
  }, [player, src, options]);

  if (!player) {
    return <Spinner />;
  }

  return <div ref={ref} />;
}

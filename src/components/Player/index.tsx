// @ts-check

import React, {useEffect, useRef, useState} from "react";
import Spinner from "@site/src/components/Spinner";
import "asciinema-player/dist/bundle/asciinema-player.css";

interface PlayerConfig {
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
  fit?: boolean | string;
  terminalLineHeight?: number;
  terminalFontFamily?: string;
  terminalFontSize?: string;
}

export default function Player(props: PlayerConfig): JSX.Element {
  const {src, ...opts} = props;
  const element = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import("asciinema-player")>();

  useEffect(() => {
    void import("asciinema-player").then((module) => {
      setPlayer(module);
    });
  }, []);

  useEffect(() => {
    const currentRef = element.current;
    const instance = player?.create(src, currentRef, opts);
    return () => {
      instance?.dispose();
    };
  }, [src, opts, player]);

  return player != null ? <div ref={element} /> : <Spinner />;
}

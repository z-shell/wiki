// @ts-check

import React, {useEffect, useRef, useState} from "react";
import Spinner from "@site/src/components/Spinner";
import "asciinema-player/dist/bundle/asciinema-player.css";

type PlayerConfig = {
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
  terminalLineHeight?: number;
  terminalFontFamily?: string;
  terminalFontSize?: string;
};

export default function Player(props: PlayerConfig): JSX.Element {
  const {src, ...options} = props;
  const element = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import("asciinema-player")>();
  const showPlayer = player ? <div ref={element} /> : <Spinner />;

  useEffect(() => {
    import("asciinema-player").then((p) => {
      setPlayer(p);
    });
  }, []);

  useEffect(() => {
    const currentRef = element.current;
    const instance = player?.create(src, currentRef, options);
    return () => {
      instance?.dispose();
    };
  }, [src, player, options]);

  return showPlayer;
}

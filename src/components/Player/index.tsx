// @ts-check

import React, {useEffect, useRef, useState} from "react";
import Loadable from "@loadable/component";
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
  fit?: string;
  terminalLineHeight?: number;
  terminalFontFamily?: string;
  terminalFontSize?: string;
}

export default function Player(props: PlayerConfig): JSX.Element {
  const {src, ...options} = props;
  const element = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import("asciinema-player")>();
  const showPlayer = player != null ? <div ref={element} /> : <Spinner />;

  useEffect(() => {
    const library = Loadable(async () => await import("asciinema-player"));
    library.load().then((module) => {
      setPlayer(module);
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

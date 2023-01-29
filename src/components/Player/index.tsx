// @ts-check

import React, {useEffect, useRef, useState} from "react";
import Spinner from "@site/src/components/Spinner";
import type {PlayerOptions} from "asciinema-player";
import "asciinema-player/dist/bundle/asciinema-player.css";

export default function Player(props: {src: string} & PlayerOptions): JSX.Element {
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

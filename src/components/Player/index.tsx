// @ts-check

import React, {useEffect, useRef, useState} from "react";
import {PlayerConfig} from "asciinema-player";
import Spinner from "@site/src/components/Spinner";
import "asciinema-player/dist/bundle/asciinema-player.css";

export default function Player(props: PlayerConfig): JSX.Element {
  const {src, ...options} = props;
  const element = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import("asciinema-player")>();
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

  return player ? <div ref={element} /> : <Spinner />;
}

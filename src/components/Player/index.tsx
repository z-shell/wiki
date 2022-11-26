/** @format */

import React, {useEffect, useRef, useState} from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
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
  className?: string;
};

export default function Player(props: PlayerProps): JSX.Element {
  const {src, ...opts} = props;
  const ref = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import("asciinema-player")>();

  useEffect(() => {
    import("asciinema-player").then((ready) => setPlayer(ready));
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    const instance = player?.create(src, currentRef, opts);

    return () => {
      instance?.dispose();
    };
  }, [player, src, opts]);

  return <BrowserOnly fallback={<Spinner />}>{() => <div ref={ref} />}</BrowserOnly>;
}

import React, {useEffect, useMemo, useRef, useState} from "react";
import Link from "@docusaurus/Link";
import Spinner from "@site/src/components/Spinner";
import "asciinema-player/dist/bundle/asciinema-player.css";

export type PlayerProps = {
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
  controls?: boolean | string;
  markers?: string;
};

export default function Player({
  src,
  cols,
  rows,
  autoPlay,
  preload,
  loop,
  startAt,
  speed,
  idleTimeLimit,
  theme,
  poster,
  fit,
  terminalLineHeight,
  terminalFontFamily,
  terminalFontSize,
  controls,
  markers,
}: PlayerProps): React.JSX.Element {
  const element = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import("asciinema-player")>();
  const [error, setError] = useState(false);

  const opts = useMemo(
    () => ({
      cols,
      rows,
      autoPlay,
      preload,
      loop,
      startAt,
      speed,
      idleTimeLimit,
      theme,
      poster,
      fit,
      terminalLineHeight,
      terminalFontFamily,
      terminalFontSize,
      controls,
      markers,
    }),
    [
      cols,
      rows,
      autoPlay,
      preload,
      loop,
      startAt,
      speed,
      idleTimeLimit,
      theme,
      poster,
      fit,
      terminalLineHeight,
      terminalFontFamily,
      terminalFontSize,
      controls,
      markers,
    ],
  );

  useEffect(() => {
    import("asciinema-player").then((module) => setPlayer(module)).catch(() => setError(true));
  }, []);

  useEffect(() => {
    const currentRef = element.current;
    const instance = player?.create(src, currentRef, opts);

    return () => {
      instance?.dispose();
    };
  }, [src, opts, player]);

  if (error) {
    return (
      <div role="alert">
        <p>
          Failed to load terminal player.{" "}
          <Link to={src} target="_blank" rel="noopener noreferrer">
            View recording directly
          </Link>
        </p>
      </div>
    );
  }

  if (player == null) {
    return (
      <div role="status" aria-label="Loading terminal recording">
        <Spinner />
      </div>
    );
  }

  return <div ref={element} role="region" aria-label="Terminal recording" />;
}

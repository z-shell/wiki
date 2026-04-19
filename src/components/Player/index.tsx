import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
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
  autoPlay: _autoPlay,
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
  const instanceRef = useRef<ReturnType<typeof import("asciinema-player").create> | null>(null);
  const [playerModule, setPlayerModule] = useState<typeof import("asciinema-player")>();
  const [error, setError] = useState(false);

  const opts = useMemo(
    () => ({
      cols,
      rows,
      autoPlay: false,
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
    import("asciinema-player").then((module) => setPlayerModule(module)).catch(() => setError(true));
  }, []);

  useEffect(() => {
    const currentRef = element.current;
    const instance = playerModule?.create(src, currentRef, opts);
    instanceRef.current = instance ?? null;

    return () => {
      instanceRef.current = null;
      instance?.dispose();
    };
  }, [src, opts, playerModule]);

  const handleVisibility = useCallback((entries: IntersectionObserverEntry[]) => {
    const instance = instanceRef.current;
    if (!instance) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    for (const entry of entries) {
      if (entry.isIntersecting) {
        instance.play();
      } else {
        instance.pause();
      }
    }
  }, []);

  useEffect(() => {
    const node = element.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleVisibility, {threshold: 0.3});
    observer.observe(node);

    return () => observer.disconnect();
  }, [handleVisibility, playerModule]);

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

  if (playerModule == null) {
    return <Spinner ariaLabel="Loading terminal recording" />;
  }

  return <div ref={element} role="region" aria-label="Terminal recording" />;
}

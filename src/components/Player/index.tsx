import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {translate} from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import Spinner from "@site/src/components/Spinner";
import type {AsciinemaPlayerInstance, AsciinemaPlayerOptions} from "asciinema-player";
import styles from "./styles.module.css";

export type PlayerProps = AsciinemaPlayerOptions & {
  src: string;
  ariaLabel?: string;
  playWhenVisible?: boolean;
};

type PlayerStatus = "idle" | "loading-module" | "creating-player" | "ready" | "error";

type PlayerShellStyle = React.CSSProperties & {
  "--player-terminal-rows"?: string;
};

export default function Player({
  src,
  ariaLabel,
  playWhenVisible,
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
  audioUrl,
  fit,
  terminalLineHeight,
  terminalFontFamily,
  terminalFontSize,
  controls,
  markers,
  pauseOnMarkers,
  logger,
}: PlayerProps): React.JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<AsciinemaPlayerInstance | null>(null);
  const [playerModule, setPlayerModule] = useState<typeof import("asciinema-player")>();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const shouldPlayWhenVisible = playWhenVisible ?? autoPlay === undefined;
  const resolvedAriaLabel =
    ariaLabel ??
    translate({
      id: "components.player.ariaLabel",
      message: "Terminal recording",
    });
  const loadingAriaLabel = translate({
    id: "components.player.loading",
    message: "Loading terminal recording",
  });
  const errorMessage = translate({
    id: "components.player.error",
    message: "Failed to load terminal player.",
  });
  const viewRecordingLabel = translate({
    id: "components.player.viewRecording",
    message: "View recording directly",
  });
  const isBusy = status !== "idle" && status !== "ready" && status !== "error";
  const effectiveAutoPlay = prefersReducedMotion ? false : autoPlay;
  const effectiveControls: AsciinemaPlayerOptions["controls"] =
    prefersReducedMotion && controls === false ? "auto" : controls;
  const shellStyle = useMemo<PlayerShellStyle>(
    () => ({
      "--player-terminal-rows": rows === undefined ? undefined : String(rows),
    }),
    [rows],
  );

  const opts = useMemo<AsciinemaPlayerOptions>(
    () => ({
      cols,
      rows,
      autoPlay: effectiveAutoPlay,
      preload,
      loop,
      startAt,
      speed,
      idleTimeLimit,
      theme,
      poster,
      audioUrl,
      fit,
      terminalLineHeight,
      terminalFontFamily,
      terminalFontSize,
      controls: effectiveControls,
      markers,
      pauseOnMarkers,
      logger,
    }),
    [
      cols,
      rows,
      effectiveAutoPlay,
      preload,
      loop,
      startAt,
      speed,
      idleTimeLimit,
      theme,
      poster,
      audioUrl,
      fit,
      terminalLineHeight,
      terminalFontFamily,
      terminalFontSize,
      effectiveControls,
      markers,
      pauseOnMarkers,
      logger,
    ],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = (): void => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setStatus("loading-module");
          Promise.all([import("asciinema-player"), import("asciinema-player/dist/bundle/asciinema-player.css")])
            .then(([m]) => {
              if (cancelled) return;
              setPlayerModule(m);
              setStatus("creating-player");
            })
            .catch(() => {
              if (cancelled) return;
              setStatus("error");
            });
        }
      },
      {rootMargin: "200px"},
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const currentRef = element.current;
    if (!playerModule || !currentRef) return;

    let cancelled = false;
    let instance: AsciinemaPlayerInstance | null = null;

    queueMicrotask(() => {
      if (cancelled) return;

      setStatus("creating-player");

      try {
        instance = playerModule.create(src, currentRef, opts);
        if (cancelled) {
          instance?.dispose();
          return;
        }

        instanceRef.current = instance;
        setStatus("ready");
      } catch {
        if (cancelled) return;

        instanceRef.current = null;
        setStatus("error");
      }
    });

    return () => {
      cancelled = true;
      instanceRef.current = null;
      instance?.dispose();
    };
  }, [src, opts, playerModule]);

  const handleVisibility = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const instance = instanceRef.current;
      if (!instance || !shouldPlayWhenVisible || prefersReducedMotion) return;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          instance.play().catch(() => {});
        } else {
          instance.pause().catch(() => {});
        }
      }
    },
    [prefersReducedMotion, shouldPlayWhenVisible],
  );

  useEffect(() => {
    if (!prefersReducedMotion) return;

    instanceRef.current?.pause().catch(() => {});
  }, [prefersReducedMotion]);

  useEffect(() => {
    const node = element.current;
    if (!node || !playerModule || !shouldPlayWhenVisible || prefersReducedMotion) return;

    const observer = new IntersectionObserver(handleVisibility, {threshold: 0.3});
    observer.observe(node);

    return () => observer.disconnect();
  }, [handleVisibility, playerModule, prefersReducedMotion, shouldPlayWhenVisible]);

  if (status === "error") {
    return (
      <div
        ref={wrapperRef}
        className={styles.shell}
        role="region"
        aria-label={resolvedAriaLabel}
        data-player-shell=""
        data-status={status}
        data-reduced-motion={prefersReducedMotion ? "true" : "false"}
        style={shellStyle}
      >
        <div className={styles.fallback} role="alert">
          <p className={styles.fallbackText}>
            {errorMessage}{" "}
            <Link className={styles.fallbackLink} to={src} target="_blank" rel="noopener noreferrer">
              {viewRecordingLabel}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={styles.shell}
      role="region"
      aria-label={resolvedAriaLabel}
      aria-busy={isBusy || undefined}
      data-player-shell=""
      data-status={status}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      style={shellStyle}
    >
      {isBusy && (
        <div className={styles.loading} aria-hidden="true">
          <Spinner ariaLabel={loadingAriaLabel} />
        </div>
      )}
      <div ref={element} className={styles.viewport} />
    </div>
  );
}

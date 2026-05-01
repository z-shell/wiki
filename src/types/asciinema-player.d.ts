declare module "asciinema-player" {
  export type AsciinemaPlayerControlsMode = boolean | "auto";

  export type AsciinemaPlayerFitMode = false | "none" | "width" | "height" | "both";

  export type AsciinemaPlayerLogger = Pick<Console, "debug" | "error" | "info" | "log" | "warn">;

  export type AsciinemaPlayerMarker = number | [number, string];

  export type AsciinemaPlayerSeekLocation = number | string | {marker: number | "next" | "prev"};

  export type AsciinemaPlayerEventMap = {
    play: void;
    playing: void;
    pause: void;
    ended: void;
    input: {data: string};
    marker: {index: number; label?: string; time: number};
  };

  export interface AsciinemaPlayerOptions {
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
    audioUrl?: string;
    fit?: AsciinemaPlayerFitMode;
    terminalLineHeight?: number;
    terminalFontFamily?: string;
    terminalFontSize?: string;
    controls?: AsciinemaPlayerControlsMode;
    markers?: ReadonlyArray<AsciinemaPlayerMarker>;
    pauseOnMarkers?: boolean;
    logger?: AsciinemaPlayerLogger;
  }

  export interface AsciinemaPlayerInstance {
    dispose(): void;
    getCurrentTime(): Promise<number>;
    getDuration(): Promise<number | null>;
    play(): Promise<void>;
    pause(): Promise<void>;
    seek(location: AsciinemaPlayerSeekLocation): Promise<void>;
    addEventListener<EventName extends keyof AsciinemaPlayerEventMap>(
      eventName: EventName,
      handler: (this: AsciinemaPlayerInstance, event: AsciinemaPlayerEventMap[EventName]) => void,
    ): void;
  }

  export function create(
    src: string,
    element: HTMLElement | null,
    opts?: AsciinemaPlayerOptions,
  ): AsciinemaPlayerInstance;
}

declare module "asciinema-player" {
  export type PlayerConfig = {
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

  export function create(
    src: string,
    element: HTMLElement | null,
    opts: {
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
  );
}

// Path: src/components/Player/asciinema-player.d.ts

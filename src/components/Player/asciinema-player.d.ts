declare module "asciinema-player" {
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
      fit?: boolean | string;
      terminalLineHeight?: number;
      terminalFontFamily?: string;
      terminalFontSize?: string;
    }
  );
}

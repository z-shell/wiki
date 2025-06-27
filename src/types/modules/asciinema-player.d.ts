declare module "asciinema-player" {
  export interface PlayerOptions {
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
    fit?: string | boolean;
    fontSize?: string;
    markers?: string;
  }

  export interface Player {
    dispose: () => void;
  }

  export function create(src: string, container: HTMLElement, options?: PlayerOptions): Player;
}

import * as AsciinemaPlayerLibrary from 'asciinema-player';
import 'asciinema-player/dist/bundle/asciinema-player.css';
import React, {useEffect, useRef} from 'react';
import styles from './styles.module.css';

type AsciinemaPlayerProps = {
  src: string;
  // START asciinemaOptions
  cols: string;
  rows: string;
  autoPlay: boolean;
  preload: boolean;
  loop: boolean | number;
  startAt: number | string;
  speed: number;
  idleTimeLimit: number;
  theme: string;
  poster: string;
  fit: string;
  fontSize: string;
  // END asciinemaOptions
};

const AsciinemaPlayer: React.FC<AsciinemaPlayerProps> = ({
  src,
  ...asciinemaOptions
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    AsciinemaPlayerLibrary.create(src, currentRef, asciinemaOptions);
  }, [src]);

  return <div className={styles.videoContainer} ref={ref} />;
};

export default AsciinemaPlayer;

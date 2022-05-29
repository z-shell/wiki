import React from 'react';
import clsx from 'clsx';
import loadable from '@loadable/component';
const AsciinemaPlayer = loadable(
  () =>
    import(/* webpackPrefetch: true */ '@site/src/components/AsciinemaPlayer')
);
import styles from './styles.module.css';

export default function HomeHeader(): JSX.Element {
  return (
    <header className={clsx('hero hero--primary', styles.herobanner)}>
      <div id={'player'} role={'video'} className={'container'}>
        <AsciinemaPlayer
          src={'https://asciinema.org/a/459358.cast'}
          preload={true}
          poster={'npt:0:01'}
          cols={209}
          rows={29}
          speed={1.5}
          idleTimeLimit={2}
        />
      </div>
    </header>
  );
}

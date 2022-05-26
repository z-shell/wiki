import React from 'react';
import clsx from 'clsx';
import loadable from '@loadable/component';
const AsciinemaPlayer = loadable(
  () => import('@site/src/components/AsciinemaPlayer')
);
import styles from './styles.module.css';

export default function HomeHeader(): JSX.Element {
  return (
    <header className={clsx('hero hero--primary', styles.herobanner)}>
      <div className={'container'}>
        <AsciinemaPlayer
          src={'https://asciinema.org/a/459358.cast'}
          cols={209}
          rows={29}
          speed={1}
          idleTimeLimit={2}
          preload={true}
        />
      </div>
    </header>
  );
}

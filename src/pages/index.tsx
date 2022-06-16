import React from 'react';
import clsx from 'clsx';
import loadable from '@loadable/component';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
const AsciinemaPlayer = loadable(
  () =>
    import(/* webpackPrefetch: true */ '@site/src/components/AsciinemaPlayer')
);
import styles from './index.module.css';
import HomeFeatures from '@site/src/components/HomeFeatures';

function HomeHeader(): JSX.Element {
  return (
    <header className={clsx('hero hero--primary', styles.herobanner)}>
      <div className={'container'}>
        <AsciinemaPlayer
          src={'https://asciinema.org/a/459358.cast'}
          poster={'npt:0:01'}
          preload={true}
          rows={26}
          cols={209}
          speed={1.5}
          idleTimeLimit={2}
        />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.tagline}`}
      description="A Swiss Army Knife for Zsh - a toolchain that works for you. <head />"
    >
      <HomeHeader />
      <main>
        <HomeFeatures />
      </main>
    </Layout>
  );
}

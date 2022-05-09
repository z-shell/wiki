import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import loadable from '@loadable/component';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
const AsciinemaPlayer = loadable(
  () => import('@site/src/components/AsciinemaPlayer'),
);
const HomepageFeatures = loadable(
  () => import('@site/src/components/HomepageFeatures'),
);

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <AsciinemaPlayer
          className={styles.videoContainer}
          src={'https://asciinema.org/a/459358.cast'}
          cols={210}
          rows={30}
          idleTimeLimit={1}
          preload={true}
        />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.tagline}`}
      description="A Swiss Army Knife for Zsh - a toolchain that works for you. <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

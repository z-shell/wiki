import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import loadable from '@loadable/component';
const AsciinemaPlayer = loadable(
  () => import('@site/src/components/AsciinemaPlayer'),
);
const HomepageFeatures = loadable(
  () => import('@site/src/components/HomepageFeatures'),
);
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={styles.videoContainer}>
            <AsciinemaPlayer
              src={'https://asciinema.org/a/459358.cast'}
              cols={209}
              rows={29}
              speed={1.5}
              idleTimeLimit={2}
              preload={true}
            />
          </div>
        </div>
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

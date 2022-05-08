import React from 'react';
import loadable from '@loadable/component';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
const HomepageFeatures = loadable(
  () => import('@site/src/components/HomepageFeatures'),
);
const AsciinemaPlayer = loadable(
  () => import('@site/src/components/AsciinemaPlayer'),
);

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <AsciinemaPlayer
          src={'assets//asciicast/demo.cast'}
          cols={210}
          rows={30}
          idleTimeLimit={3}
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

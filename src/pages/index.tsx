import React from 'react';
import clsx from 'clsx';
import lazy from '@loadable/component';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
const HomepageFeatures = lazy(
  () => import('@site/src/components/HomepageFeatures'),
);
const AsciinemaPlayer = lazy(
  () => import('@site/src/components/AsciinemaPlayer'),
);

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <AsciinemaPlayer
          src={'/assets/asciicast/demo.cast'}
          cols={208}
          rows={25}
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

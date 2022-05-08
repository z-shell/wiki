import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import lazy from '@loadable/component';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
const HomepageFeatures = lazy(
  () => import('@site/src/components/HomepageFeatures'),
);
const AsciinemaPlayer = lazy(
  () => import('@site/src/components/AsciinemaPlayer'),
);
import styles from './styles.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <AsciinemaPlayer
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

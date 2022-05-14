import * as React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import loadable from '@loadable/component';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader(): JSX.Element {
  const AsciinemaPlayer = loadable(
    () => import('@site/src/components/AsciinemaPlayer')
  );
  return (
    <header className={clsx('hero hero--primary', styles.herobanner)}>
      <div className={styles.aplayer}>
        <AsciinemaPlayer
          src={'https://asciinema.org/a/459358.cast'}
          cols={209}
          rows={29}
          speed={1.5}
          idleTimeLimit={2}
          preload
        />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const HomepageFeatures = loadable(
    () => import('@site/src/components/HomepageFeatures')
  );
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.tagline}`}
      description={
        'A Swiss Army Knife for Zsh - a toolchain that works for you. <head />'
      }
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

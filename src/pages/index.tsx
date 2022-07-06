import React from 'react';
import clsx from 'clsx';
import loadable from '@loadable/component';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeFeatures from '@site/src/components/HomeFeatures';
import 'asciinema-player/dist/bundle/asciinema-player.css';
import styles from './index.module.css';

const AsciinemaPlayer = loadable(
  () => import('@site/src/components/AsciinemaPlayer')
);

function HomeHeader(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.herobanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function FeaturesContainer(): JSX.Element {
  return (
    <section className={styles.asciicasts}>
      <div className="container">
        <div className="col">
          <h2> ⚡ Fast and feature-rich</h2>
          <div>
            <AsciinemaPlayer
              src="https://asciinema.org/a/497831.cast"
              poster="npt:0:30"
              rows={25}
              cols={200}
              speed={2}
              idleTimeLimit={1}
              preload
            />
          </div>
        </div>
        <div className={styles.features}>
          <div className="col">
            <HomeFeatures />
          </div>
        </div>
        <div className="col">
          <h2> ✨ Neat and flexible</h2>
          <div>
            <AsciinemaPlayer
              src="https://asciinema.org/a/459358.cast"
              poster="npt:2:34"
              rows={25}
              cols={200}
              speed={2}
              idleTimeLimit={1}
              preload
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomeHeader />
      <main>
        <FeaturesContainer />
      </main>
    </Layout>
  );
}

export default Home;

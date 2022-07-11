import React from 'react';
import clsx from 'clsx';
import loadable from '@loadable/component';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeFeatures from '@site/src/components/HomeFeatures';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';

const AsciinemaPlayer = loadable(
  () =>
    import(/* webpackPrefetch: true */ '@site/src/components/AsciinemaPlayer')
);

function FeaturesContainer(): JSX.Element {
  return (
    <section className={styles.videocontainer}>
      <div className="container">
        <div className="col">
          <div className={styles.asciicasts}>
            <h2>
              <Translate
                id="homepage.video.heading.1"
                description="The homepage video conatainer heading 1"
              >
                ⚡ Fast and feature-rich
              </Translate>
            </h2>
            <AsciinemaPlayer
              src="https://asciinema.org/a/459358.cast"
              /* poster="npt:0:30" */
              rows={30}
              cols={210}
              speed={3}
              idleTimeLimit={1}
              preload
            />
          </div>
          <div className={styles.features}>
            <HomeFeatures />
          </div>
          <div className={styles.asciicasts}>
            <h2>
              <Translate
                id="homepage.video.heading.2"
                description="The homepage video container heading 2"
              >
                ✨ Neat and flexible
              </Translate>
            </h2>
            <AsciinemaPlayer
              /* poster="npt:2:34" */
              src="https://asciinema.org/a/497831.cast"
              rows={30}
              cols={210}
              speed={3}
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
    <Layout title={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.herobanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        <FeaturesContainer />
      </main>
    </Layout>
  );
}

export default Home;

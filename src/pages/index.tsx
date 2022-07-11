import React, { useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import baseLoad from '@loadable/component';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  color: 'var(--ifm-color-primary)',
};

function Spinner(): JSX.Element {
  const loading = useState(true);
  const color = useState('#ffffff');
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={420}
      />
    </div>
  );
}

function loadable(func): JSX.Element {
  return baseLoad(func, { fallback: <Spinner /> });
}

const AsciinemaPlayer = loadable(
  () => import('@site/src/components/AsciinemaPlayer')
);
const HomeFeatures = loadable(
  () => import('@site/src/components/HomeFeatures')
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

function HeroBanner(): JSX.Element {
  return (
    <div className={styles.hero} data-theme="dark">
      <div className={styles.heroInner}>
        <h1 className={styles.heroProjectTagline}>
          <img
            alt={translate({ message: 'ZI logo' })}
            className={styles.heroLogo}
            src="/img/logo.svg"
            width="200"
            height="200"
          />
          <span
            className={styles.heroTitleTextHtml}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: translate({
                id: 'homepage.hero.title',
                message:
                  'A <b>Swiss Army</b> Knife  for <b>Zsh</b> unix <b>Shell</b>',
                description:
                  'Home page hero title, can contain simple html tags',
              }),
            }}
          />
        </h1>
        <div className={styles.indexCtas}>
          <Link
            className="button button--primary"
            to="/docs/getting_started/installation"
          >
            <Translate>Get Started</Translate>
          </Link>
          <Link className="button button--secondary" to="/community/intro">
            <Translate>Community</Translate>
          </Link>
          <span className={styles.indexCtasGitHubButtonWrapper}>
            <iframe
              className={styles.indexCtasGitHubButton}
              src="https://ghbtns.com/github-btn.html?user=z-shell&amp;repo=zi&amp;type=star&amp;count=true&amp;size=large"
              width={160}
              height={30}
              title="GitHub Stars"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.tagline}>
      <header>
        <HeroBanner />
      </header>
      <main>
        <FeaturesContainer />
      </main>
    </Layout>
  );
}

export default Home;

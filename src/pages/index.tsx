import React from 'react';
import Layout from '@theme/Layout';
import HomeFeatures from '@site/src/components/HomeFeatures';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

function HeroBanner() {
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
            <Translate> Get Started </Translate>
          </Link>
          <Link className="button button--secondary" to="/community/intro">
            <Translate> Community </Translate>
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
        <HomeFeatures />
      </main>
    </Layout>
  );
}

export default Home;

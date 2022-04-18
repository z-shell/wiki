// @ts-nocheck
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeaturesList from '@site/src/components/FeaturesList';
import SocialHome from '@site/src/components/SocialHome';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h3 className="hero__title">{siteConfig.title}</h3>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            <Translate
              id="homepage.button"
              description="The homepage button to wiki introduction"
            >
              &#128162; A Swiss Army Knife for Zsh &#128162;
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.tagline}`}
      description="The Open Source Society with Link passion for Zsh <head />"
    >
      <HomepageHeader />
      <main>
        <FeaturesList />
        <SocialHome />
      </main>
    </Layout>
  );
}

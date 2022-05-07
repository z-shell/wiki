import React, {Suspense} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
const HomepageFeatures = React.lazy(
  () => import('@site/src/components/HomepageFeatures'),
);

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1>{siteConfig.title}</h1>
        <h2>{siteConfig.tagline}</h2>
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
        <Suspense fallback={<div>Loading...</div>}>
          <HomepageFeatures />
        </Suspense>
      </main>
    </Layout>
  );
}

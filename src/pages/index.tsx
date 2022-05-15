import * as React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import loadable from '@loadable/component';
const HomeHeader = loadable(() => import('@site/src/components/HomeHeader'));
const HomeFeatures = loadable(
  () => import('@site/src/components/HomeFeatures')
);

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.tagline}`}
      description="A Swiss Army Knife for Zsh - a toolchain that works for you. <head />"
    >
      <HomeHeader />
      <main>
        <HomeFeatures />
      </main>
    </Layout>
  );
}

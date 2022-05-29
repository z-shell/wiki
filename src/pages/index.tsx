import React from 'react';
import loadable from '@loadable/component';
const Layout = loadable(() => import('@theme/Layout'));
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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

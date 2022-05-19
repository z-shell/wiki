import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeHeader from '@site/src/components/HomeHeader';
import HomeFeatures from '@site/src/components/HomeFeatures';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.tagline}`}
      description="A Swiss Army Knife for Zsh - a toolchain that works for you. <head />"
    >
      <main>
        <HomeHeader />
        <HomeFeatures />
      </main>
    </Layout>
  );
}

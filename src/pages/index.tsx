/** @format */
// @ts-check

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomeBanner from "@site/src/components/HomeBanner";
import HomeFeatures from "@site/src/components/HomeFeatures";

export default function Home(): JSX.Element {
  const {
    siteConfig: {customFields, tagline},
  } = useDocusaurusContext();
  const {description} = customFields as {description: string};
  return (
    <Layout title={tagline} description={description}>
      <main>
        <HomeBanner />
        <HomeFeatures />
      </main>
    </Layout>
  );
}

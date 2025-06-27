import React, {memo} from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {translate} from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import HomeBanner from "@site/src/components/HomeBanner";
import HomeFeatures from "@site/src/components/HomeFeatures";

/**
 * Homepage component for the Zi documentation site
 *
 * @returns The complete homepage layout with banner and features
 */
function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  const description = translate({
    id: "homepage.description",
    message: "A Swiss Army Knife Toolchain for Zsh Unix shell",
    description: "Meta description for the homepage",
  });

  return (
    <Layout title={siteConfig.tagline} description={description}>
      <header>
        <HomeBanner />
      </header>
      <main>
        <HomeFeatures />
      </main>
    </Layout>
  );
}

export default memo(Home);

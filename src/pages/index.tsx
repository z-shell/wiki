import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomeBanner from "@site/src/components/HomeBanner";
import HomeCommunity from "@site/src/components/HomeCommunity";
import HomeEcosystem from "@site/src/components/HomeEcosystem";
import HomeShowcase from "@site/src/components/HomeShowcase";
import HomeWhyZi from "@site/src/components/HomeWhyZi";

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.tagline} description="A Swiss Army Knife Toolchain for Zsh Unix shell">
      <div className="homePage">
        <header>
          <HomeBanner />
        </header>
        <main className="homeMain">
          <HomeEcosystem />
          <HomeShowcase />
          <HomeWhyZi />
          <HomeCommunity />
        </main>
      </div>
    </Layout>
  );
}

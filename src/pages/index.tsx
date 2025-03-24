// @ts-check

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomeBanner from "@site/src/components/HomeBanner";
import HomeFeatures from "@site/src/components/HomeFeatures";

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.tagline} description='A Swiss Army Knife Toolchain for Zsh Unix shell'>
      <header>
        <HomeBanner />
      </header>
      <main>
        <HomeFeatures />
      </main>
    </Layout>
  );
}

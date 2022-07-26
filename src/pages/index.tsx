/** @format */

import React from 'react';
import Layout from '@theme/Layout';
import HomeBanner from '@site/src/components/HomeBanner';
import HomeFeatures from '@site/src/components/HomeFeatures';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout title={siteConfig.tagline}>
			<header>
				<HomeBanner />
			</header>
			<main>
				<HomeFeatures />
			</main>
		</Layout>
	);
}

export default Home;

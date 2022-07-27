/** @format */

import React from 'react';
import Layout from '@theme/Layout';
import HomeBanner from '@site/src/components/HomeBanner';
import HomeFeatures from '@site/src/components/HomeFeatures';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={siteConfig.tagline}
			description={siteConfig.tagline}
		>
			<main>
				<div>
					<HomeBanner />
				</div>
				<div>
					<HomeFeatures />
				</div>
			</main>
		</Layout>
	);
}

export default Home;

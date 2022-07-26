/** @format */

import React from 'react';
import Loadable from 'react-loadable';
import Loading from '@site/src/components/Spinner';
import Layout from '@theme/Layout';
import HomeFeatures from '@site/src/components/HomeFeatures';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const HomeBanner = Loadable({
	loader: () => import('@site/src/components/HomeBanner'),
	loading: Loading,
});

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

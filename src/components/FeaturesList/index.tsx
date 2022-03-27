// @ts-nocheck
import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature1.title',
      message: 'Zsh Startup 50-80% Faster',
      description: 'Title of feature 1 (left) on the home page',
    }),
    Svg: require('@site/static/zw/svg/turbo.svg').default,
    description: (
      <Translate id="home.fetaure1" description="Description of first featured banner in homepage">
        Instant prompt postponing plugins loading to a moment when the processing of .zshrc file is finished.
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'homepage.feature2.title',
      message: 'Focus on What Matters',
      description: 'Title of feature 2 (middle) on the home page',
    }),
    Svg: require('@site/static/zw/svg/stats.svg').default,
    description: (
      <Translate id="home.fetaure2" description="Description of second featured banner in homepage">
        Statistics about the plugins, describing what functions, bindkeys, completions, and other elements a plugin has
        set up.
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'homepage.feature3.title',
      message: 'Wide Range of Features',
      description: 'Title of feature 3 (right) on the home page',
    }),
    Svg: require('@site/static/zw/svg/zsh.svg').default,
    description: (
      <Translate id="home.fetaure3" description="Description of third featured banner in homepage">
        Supports Oh-My-Zsh and Prezto - not framework-specific. Produce your plugins, libraries, and themes
        effortlessly.
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

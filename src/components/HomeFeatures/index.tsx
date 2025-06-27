import React, {memo} from "react";
import clsx from "clsx";
import Translate, {translate} from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import Player from "@site/src/components/Player";
import Emoji from "@site/src/components/Emoji";
import Icon from "@site/src/components/Icon";
import type {FeatureItem} from "@site/types/components/ui";
import styles from "./styles.module.css";

const Features: FeatureItem[] = [
  {
    title: translate({
      id: "homepage.feature1.title",
      message: "Zsh Startup 50-80% Faster",
      description: "Title of feature 1 (left) on the home page",
    }),
    icon: <Icon name='sync' spin className='fa-6x' />,
    description: (
      <Translate id='home.feature1' description='Description of first featured banner in homepage'>
        Instant prompt postponing plugins loading to a moment when the processing of .zshrc file is finished.
      </Translate>
    ),
  },
  {
    title: translate({
      id: "homepage.feature2.title",
      message: "Focus on What Matters",
      description: "Title of feature 2 (middle) on the home page",
    }),
    icon: <Icon name='list-check' className='fa-8x' />,
    description: (
      <Translate id='home.feature2' description='Description of second featured banner in homepage'>
        Statistics about the plugins, describing what functions, bindkeys, completions, and other elements a plugin has
        set up.
      </Translate>
    ),
  },
  {
    title: translate({
      id: "homepage.feature3.title",
      message: "Wide Range of Features",
      description: "Title of feature 3 (right) on the home page",
    }),
    icon: <Icon name='layer-group' className='fa-6x' />,
    description: (
      <Translate id='home.feature3' description='Description of third featured banner in homepage'>
        Supports Oh-My-Zsh and Prezto - not framework-specific. Produce your plugins, libraries, and themes
        effortlessly.
      </Translate>
    ),
  },
];

/**
 * Individual feature component for the homepage
 *
 * @param props - Component properties including title, icon, description, and class name
 * @returns A JSX element representing a single feature
 */
const Feature = memo(function Feature({title, icon, description, className}: FeatureItem) {
  return (
    <div className={clsx("col", className)}>
      <div className={styles.FeatureIcon} aria-hidden='true'>
        {icon}
      </div>
      <Heading as='h2' className={styles.FeatureHeading}>
        {title}
      </Heading>
      <p className='padding-horiz--md'>{description}</p>
    </div>
  );
});

/**
 * Generate a unique key for feature item
 *
 * @param title - Feature title which can be a string or JSX element
 * @returns A string that can be used as a key
 */
function getFeatureKey(title: string | React.JSX.Element): string {
  return typeof title === "string" ? title : JSON.stringify(title);
}

/**
 * Home features section component displaying the main features of the application
 *
 * @returns A JSX element containing all feature components and demo video
 */
function HomeFeatures(): React.JSX.Element {
  return (
    <section className={styles.HomeFeatures}>
      <div className='container text--center'>
        <div className='row margin-bottom--lg'>
          {Features.map((feature) => (
            <Feature
              key={getFeatureKey(feature.title)}
              title={feature.title}
              icon={feature.icon}
              description={feature.description}
              className={clsx("col--4", styles.Feature)}
            />
          ))}
        </div>
      </div>
      <div className={styles.VideoContainer}>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <Heading as='h2' className={styles.VideoContainerHeading}>
                <Emoji style={{paddingRight: "0.5rem"}} symbol='⚡' label='high-voltage' />
                <Translate id='homepage.video.heading.1' description='The homepage video container heading 1'>
                  Fast and feature-rich
                </Translate>
              </Heading>
              <div className='video-container' aria-label='Feature demonstration video'>
                <Player
                  src='https://asciinema.org/a/509113.cast'
                  rows={34}
                  cols={231}
                  terminalFontFamily='var(--ifm-font-family-monospace)'
                  terminalFontSize='var(--ifm-code-font-size)'
                  fit={false}
                  controls={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HomeFeatures);

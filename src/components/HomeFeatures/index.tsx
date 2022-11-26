/** @format */
// @ts-check

import React from "react";
import clsx from "clsx";
import Translate, {translate} from "@docusaurus/Translate";
import Player from "@site/src/components/Player";
import Emoji from "@site/src/components/Emoji";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: () => JSX.Element;
  description: JSX.Element;
};

const turbo = () => <i className='fa-6x fa-solid fa-forward' />;
const stats = () => <i className='fa-8x fa-solid fa-ranking-star' />;
const create = () => <i className=' fa-6x fa-solid fa-layer-group' />;

const Features: FeatureItem[] = [
  {
    title: translate({
      id: "homepage.feature1.title",
      message: "Zsh Startup 50-80% Faster",
      description: "Title of feature 1 (left) on the home page",
    }),
    Svg: turbo,
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
    Svg: stats,
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
    Svg: create,
    description: (
      <Translate id='home.feature3' description='Description of third featured banner in homepage'>
        Supports Oh-My-Zsh and Prezto - not framework-specific. Produce your plugins, libraries, and themes
        effortlessly.
      </Translate>
    ),
  },
];

function VideoContainer1() {
  return (
    <div className={styles.VideoContainer}>
      <div className='container'>
        <h2>
          <Emoji
            style={{
              paddingRight: "0.5rem",
            }}
            symbol='⚡'
            label='high-voltage'
          />
          <Translate id='homepage.video.heading.1' description='The homepage video container heading 1'>
            Fast and feature-rich
          </Translate>
        </h2>
        <Player src='https://asciinema.org/a/509113.cast' rows={34} cols={231} />
      </div>
    </div>
  );
}

function VideoContainer2() {
  return (
    <div className={styles.VideoContainer}>
      <div className='container'>
        <h2>
          <Emoji
            style={{
              paddingRight: "0.5rem",
            }}
            symbol='✨'
            label='sparkles'
          />
          <Translate id='homepage.video.heading.2' description='The homepage video container heading 2'>
            Neat and flexible
          </Translate>
        </h2>
        <Player src='https://asciinema.org/a/497831.cast' rows={34} cols={231} />
      </div>
    </div>
  );
}

function Feature({Svg, title, description}: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.FeatureImg}>
        <Svg />
      </div>
      <div className={styles.FeatureText}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function FeaturesContainer() {
  return (
    <div className={styles.FeatureContainer}>
      <div className='container'>
        <div className='row'>
          {Features.map((props, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomeFeatures(): JSX.Element {
  return (
    <section>
      <div>
        <VideoContainer1 />
        <FeaturesContainer />
        <VideoContainer2 />
      </div>
    </section>
  );
}

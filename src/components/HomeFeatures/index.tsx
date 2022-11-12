/** @format */
// @ts-check

import React from "react";
import clsx from "clsx";
import Translate, {translate} from "@docusaurus/Translate";
import Player from "@site/src/components/Player";
import Emoji from "@site/src/components/Emoji";
import styles from "./styles.module.css";

const turboSvg = () => (
  <span className='fa-6x'>
    <i className='fa-solid fa-forward' />
  </span>
);

const statsSvg = () => (
  <span className='fa-8x'>
    <i className='fa-solid fa-ranking-star' />
  </span>
);

const createSvg = () => (
  <span className='fa-6x'>
    <i className='fa-solid fa-layer-group' />
  </span>
);

type FeatureItem = {
  title: string;
  Svg: () => JSX.Element;
  description: JSX.Element;
};

const Features: FeatureItem[] = [
  {
    title: translate({
      id: "homepage.feature1.title",
      message: "Zsh Startup 50-80% Faster",
      description: "Title of feature 1 (left) on the home page",
    }),
    Svg: turboSvg,
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
    Svg: statsSvg,
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
    Svg: createSvg,
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
    <div className={clsx("container", styles.VideoContainer)}>
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
  );
}

function VideoContainer2() {
  return (
    <div className={clsx("container", styles.VideoContainer)}>
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
  );
}

function FeaturesContainer() {
  return (
    <div className={clsx("container", styles.FeatureContainer)}>
      {Features.map(({Svg, title, description}, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={clsx("col col--4", styles.FeatureItem)}>
          {Svg && (
            <div className={styles.FeatureImg}>
              <Svg />
            </div>
          )}
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomeFeatures(): JSX.Element {
  return (
    <div className={styles.HomeFeatures}>
      <VideoContainer1 />
      <FeaturesContainer />
      <VideoContainer2 />
    </div>
  );
}

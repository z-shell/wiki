// @ts-check

import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import Player from "@site/src/components/Player";
import Emoji from "@site/src/components/Emoji";
import Features, {type FeatureItem} from "@site/src/data/features";
import styles from "./styles.module.css";

function Feature({feature}: {feature: FeatureItem}) {
  return (
    <div className={clsx("col col--4")}>
      <div className={clsx(styles.FeatureImg)}>
        <feature.image />
      </div>
      <div className={clsx(styles.FeatureHeading)}>{feature.title}</div>
      <p className='padding-horiz--md'>{feature.description}</p>
    </div>
  );
}

function FeaturesContainer() {
  return (
    <div className='container text--center'>
      <div className='row margin-bottom--lg'>
        {Features.map((feature, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Feature key={idx} feature={feature} />
        ))}
      </div>
    </div>
  );
}

function VideoContainer() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className={styles.VideoContainerHeading}>
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
          </div>
          <div className='video-container'>
            <Player src='https://asciinema.org/a/509113.cast' rows={34} cols={231} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeFeatures(): JSX.Element {
  return (
    <section className={styles.HomeFeatures}>
      <FeaturesContainer />
      <div className={styles.VideoContainer}>
        <VideoContainer />
      </div>
    </section>
  );
}

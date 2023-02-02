// @ts-check

import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import Player from "@site/src/components/Player";
import Emoji from "@site/src/components/Emoji";
import type {FeatureItem} from "@site/src/data/features";
import Features from "@site/src/data/features";
import styles from "./styles.module.css";

function Feature({title, icon, description, className}: FeatureItem) {
  return (
    <div className={clsx("col", className)}>
      <div className={styles.FeatureIcon}>{icon}</div>
      <Heading as='h2' className={styles.FeatureHeading}>
        {title}
      </Heading>
      <p className='padding-horiz--md'>{description}</p>
    </div>
  );
}

export default function HomeFeatures(): JSX.Element {
  return (
    <section className={styles.HomeFeatures}>
      <div className='container text--center'>
        <div className='row margin-bottom--lg'>
          {Features.map(({title, icon, description}) => (
            <Feature
              key={title}
              title={title}
              icon={icon}
              description={description}
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
              <div className='video-container'>
                <Player
                  src='https://asciinema.org/a/509113.cast'
                  rows={34}
                  cols={231}
                  terminalFontFamily='var(--ifm-font-family-monospace)'
                  terminalFontSize='var(--ifm-code-font-size)'
                  fit={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

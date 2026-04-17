import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import type {FeatureItem} from "@site/src/data/features";
import Features from "@site/src/data/features";
import styles from "./styles.module.css";

function Feature({title, icon, description, className}: FeatureItem) {
  return (
    <div className={clsx("col", className)}>
      <div className={styles.FeatureIcon}>{icon}</div>
      <Heading as="h2" className={styles.FeatureHeading}>
        {title}
      </Heading>
      <p className="padding-horiz--md">{description}</p>
    </div>
  );
}

export default function HomeFeatures(): React.JSX.Element {
  return (
    <section className={styles.HomeFeatures}>
      <div className="container text--center">
        <div className={clsx("row", styles.featureRow)}>
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
    </section>
  );
}

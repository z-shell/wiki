import React from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

const turboSvg = () => (
  <span className="fa-6x">
    <i className="fa-solid fa-forward" />
  </span>
);

const statsSvg = () => (
  <span className="fa-8x">
    <i className="fa-solid fa-ranking-star" />
  </span>
);

const createSvg = () => (
  <span className="fa-6x">
    <i className="fa-solid fa-layer-group" />
  </span>
);

const features = [
  {
    title: translate({
      id: "homepage.feature1.title",
      message: "Zsh Startup 50-80% Faster",
      description: "Title of feature 1 (left) on the home page",
    }),
    Svg: turboSvg,
    description: (
      <Translate
        id="home.feature1"
        description="Description of first featured banner in homepage"
      >
        Instant prompt postponing plugins loading to a moment when the
        processing of .zshrc file is finished.
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
      <Translate
        id="home.feature2"
        description="Description of second featured banner in homepage"
      >
        Statistics about the plugins, describing what functions, bindkeys,
        completions, and other elements a plugin has set up.
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
      <Translate
        id="home.feature3"
        description="Description of third featured banner in homepage"
      >
        Supports Oh-My-Zsh and Prezto - not framework-specific. Produce your
        plugins, libraries, and themes effortlessly.
      </Translate>
    ),
  },
];

function HomeFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map(({ title, Svg, description }, idx) => (
            <div key={idx} className={clsx("col col--4", styles.features)}>
              {Svg && (
                <div className={styles.featureimage}>
                  <Svg role="img" alt={title} />
                </div>
              )}
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeFeatures;

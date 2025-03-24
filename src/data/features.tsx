import React from "react";
import Translate, {translate} from "@docusaurus/Translate";
import styles from "@site/src/data/features.module.css";

const turbo = () => (
  <span className={styles.animation5}>
    <div className='fa-6x'>
      <i className='fa-solid fa-sync fa-spin' />
    </div>
  </span>
);
const stats = () => (
  <span className={styles.animation30} data-fa-transform='grow-6'>
    <div className={styles.bounce}>
      <div className='fa-8x '>
        <i className='fa-solid fa-ranking-star fa-bounce' />
      </div>
    </div>
  </span>
);
const create = () => (
  <span className={styles.animation15}>
    <div className='fa-6x'>
      <i className='fa-solid fa-layer-group fa-shake' />
    </div>
  </span>
);

export interface FeatureItem {
  title: string;
  icon: React.JSX.Element;
  description: React.JSX.Element;
  className?: string;
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: "homepage.feature1.title",
      message: "Zsh Startup 50-80% Faster",
      description: "Title of feature 1 (left) on the home page",
    }),
    icon: turbo(),
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
    icon: stats(),
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
    icon: create(),
    description: (
      <Translate id='home.feature3' description='Description of third featured banner in homepage'>
        Supports Oh-My-Zsh and Prezto - not framework-specific. Produce your plugins, libraries, and themes
        effortlessly.
      </Translate>
    ),
  },
];

export default FEATURES;

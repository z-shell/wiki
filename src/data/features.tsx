import React from "react";
import Translate, {translate} from "@docusaurus/Translate";

const turbo = () => <i className='fa-6x fa-solid fa-fast-forward' />;
const stats = () => <i className='fa-8x fa-solid fa-ranking-star' />;
const create = () => <i className=' fa-6x fa-solid fa-layer-group' />;

export type FeatureItem = {
  title: string;
  image: () => JSX.Element;
  description: JSX.Element;
};

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: "homepage.feature1.title",
      message: "Zsh Startup 50-80% Faster",
      description: "Title of feature 1 (left) on the home page",
    }),
    image: turbo,
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
    image: stats,
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
    image: create,
    description: (
      <Translate id='home.feature3' description='Description of third featured banner in homepage'>
        Supports Oh-My-Zsh and Prezto - not framework-specific. Produce your plugins, libraries, and themes
        effortlessly.
      </Translate>
    ),
  },
];

export default FEATURES;

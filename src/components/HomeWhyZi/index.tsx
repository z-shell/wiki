import React from "react";
import Translate, {translate} from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type CardItem = {
  icon: string;
  title: string;
  description: React.JSX.Element;
};

const CARDS: CardItem[] = [
  {
    icon: "⚡",
    title: translate({
      id: "homepage.whyzi.speed.title",
      message: "50–80% Faster Startup",
      description: "Why Zi card 1 title",
    }),
    description: (
      <Translate id="homepage.whyzi.speed.desc" description="Why Zi card 1 description">
        Turbo mode defers plugin loading until after .zshrc is processed, giving you an instant prompt every time.
      </Translate>
    ),
  },
  {
    icon: "📦",
    title: translate({
      id: "homepage.whyzi.ecosystem.title",
      message: "Rich Plugin Ecosystem",
      description: "Why Zi card 2 title",
    }),
    description: (
      <Translate id="homepage.whyzi.ecosystem.desc" description="Why Zi card 2 description">
        Native support for Oh-My-Zsh and Prezto frameworks, plus annexes, packages, and meta-plugins for any workflow.
      </Translate>
    ),
  },
  {
    icon: "🔧",
    title: translate({
      id: "homepage.whyzi.flexible.title",
      message: "Flexible & Extensible",
      description: "Why Zi card 3 title",
    }),
    description: (
      <Translate id="homepage.whyzi.flexible.desc" description="Why Zi card 3 description">
        Ice modifiers, multiple output formats, and a powerful API that adapts to any shell customization workflow.
      </Translate>
    ),
  },
];

function Card({icon, title, description}: CardItem): React.JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDesc}>{description}</p>
    </div>
  );
}

export default function HomeWhyZi(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.heading}>
          <Translate id="homepage.whyzi.heading" description="Why Zi section heading">
            Why Zi?
          </Translate>
        </Heading>
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

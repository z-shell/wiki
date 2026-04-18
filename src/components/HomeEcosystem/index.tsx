import React from "react";
import Link from "@docusaurus/Link";
import Translate, {translate} from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type EcosystemItem = {
  icon: string;
  title: string;
  description: string;
  link: string;
};

const ITEMS: EcosystemItem[] = [
  {
    icon: "/img/svg/cards/annexes.svg",
    title: translate({id: "homepage.eco.annexes.title", message: "Annexes"}),
    description: translate({
      id: "homepage.eco.annexes.desc",
      message: "Extend Zi with binary management, patching, submods, and more.",
    }),
    link: "/ecosystem/annexes/overview",
  },
  {
    icon: "/img/svg/cards/meta-plugins.svg",
    title: translate({id: "homepage.eco.meta.title", message: "Meta Plugins"}),
    description: translate({
      id: "homepage.eco.meta.desc",
      message: "Curated groups of plugins installed with a single label.",
    }),
    link: "/ecosystem/annexes/meta-plugins",
  },
  {
    icon: "/img/svg/cards/packages.svg",
    title: translate({id: "homepage.eco.packages.title", message: "Packages"}),
    description: translate({
      id: "homepage.eco.packages.desc",
      message: "Pre-configured definitions that simplify complex setups.",
    }),
    link: "/ecosystem/packages/synopsis",
  },
  {
    icon: "/img/svg/cards/syntax-highlighting.svg",
    title: translate({id: "homepage.eco.fsh.title", message: "Syntax Highlighting"}),
    description: translate({
      id: "homepage.eco.fsh.desc",
      message: "F-Sy-H — fast syntax highlighting with themes and patterns.",
    }),
    link: "/ecosystem/plugins/f-sy-h",
  },
  {
    icon: "/img/svg/cards/history-search.svg",
    title: translate({id: "homepage.eco.hsmw.title", message: "History Search"}),
    description: translate({
      id: "homepage.eco.hsmw.desc",
      message: "Multi-word search with syntax highlighting and smart matching.",
    }),
    link: "/ecosystem/plugins/h-s-mw",
  },
  {
    icon: "/img/svg/cards/zi-console.svg",
    title: translate({id: "homepage.eco.console.title", message: "Zi Console"}),
    description: translate({
      id: "homepage.eco.console.desc",
      message: "Interactive curses-based UI for managing plugins and snippets.",
    }),
    link: "/ecosystem/plugins/zi-console",
  },
];

function EcoCard({icon, title, description, link}: EcosystemItem): React.JSX.Element {
  return (
    <Link to={link} className={styles.card}>
      <img src={useBaseUrl(icon)} alt={title} className={styles.cardEmoji} width={80} height={80} loading="lazy" />
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDesc}>{description}</p>
    </Link>
  );
}

export default function HomeEcosystem(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.heading}>
          <Translate id="homepage.eco.heading" description="Ecosystem section heading">
            Explore the Ecosystem
          </Translate>
        </Heading>
        <p className={styles.subheading}>
          <Translate id="homepage.eco.subheading" description="Ecosystem section subheading">
            A growing collection of annexes, plugins, and packages built around Zi.
          </Translate>
        </p>
        <div className={styles.grid}>
          {ITEMS.map((item) => (
            <EcoCard key={item.link} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "@docusaurus/Link";
import Translate, {translate} from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type CommunityLink = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

const LINKS: CommunityLink[] = [
  {
    icon: "fa-brands fa-github",
    title: translate({id: "homepage.community.github.title", message: "GitHub"}),
    description: translate({id: "homepage.community.github.desc", message: "Source code, issues, and contributions"}),
    href: "https://github.com/z-shell",
  },
  {
    icon: "fa-solid fa-comments",
    title: translate({id: "homepage.community.discuss.title", message: "Discussions"}),
    description: translate({id: "homepage.community.discuss.desc", message: "Ask questions and share ideas"}),
    href: "https://discussions.zshell.dev",
  },
  {
    icon: "fa-solid fa-language",
    title: translate({id: "homepage.community.translate.title", message: "Translate"}),
    description: translate({id: "homepage.community.translate.desc", message: "Help translate the documentation"}),
    href: "https://translate.zshell.dev",
  },
];

function CommunityCard({icon, title, description, href}: CommunityLink): React.JSX.Element {
  return (
    <Link href={href} className={styles.card}>
      <i className={`${icon} ${styles.cardIcon}`} />
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDesc}>{description}</p>
    </Link>
  );
}

export default function HomeCommunity(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.heading}>
          <Translate id="homepage.community.heading" description="Community section heading">
            Join the Community
          </Translate>
        </Heading>
        <div className={styles.grid}>
          {LINKS.map((link) => (
            <CommunityCard key={link.title} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}

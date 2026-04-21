import React from "react";
import Link from "@docusaurus/Link";
import Translate, {translate} from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import Svg from "@site/src/components/Svg";
import styles from "./styles.module.css";

type CommunityIcon = "github" | "discussions" | "translate";

type CommunityLink = {
  icon: CommunityIcon;
  title: string;
  description: string;
  href: string;
};

type CommunityGlyph = {
  viewBox: string;
  path: string;
};

const LINKS: CommunityLink[] = [
  {
    icon: "github",
    title: translate({id: "homepage.community.github.title", message: "GitHub"}),
    description: translate({id: "homepage.community.github.desc", message: "Source code, issues, and contributions"}),
    href: "https://github.com/z-shell",
  },
  {
    icon: "discussions",
    title: translate({id: "homepage.community.discuss.title", message: "Discussions"}),
    description: translate({id: "homepage.community.discuss.desc", message: "Ask questions and share ideas"}),
    href: "https://discussions.zshell.dev",
  },
  {
    icon: "translate",
    title: translate({id: "homepage.community.translate.title", message: "Translate"}),
    description: translate({id: "homepage.community.translate.desc", message: "Help translate the documentation"}),
    href: "https://translate.zshell.dev",
  },
];

const COMMUNITY_GLYPHS: Record<CommunityIcon, CommunityGlyph> = {
  github: {
    viewBox: "0 0 512 512",
    path: "M173.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM252.8 8c-138.7 0-244.8 105.3-244.8 244 0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1 100-33.2 167.8-128.1 167.8-239 0-138.7-112.5-244-251.2-244zM105.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9s4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
  },
  discussions: {
    viewBox: "0 0 576 512",
    path: "M384 144c0 97.2-86 176-192 176-26.7 0-52.1-5-75.2-14L35.2 349.2c-9.3 4.9-20.7 3.2-28.2-4.2s-9.2-18.9-4.2-28.2l35.6-67.2C14.3 220.2 0 183.6 0 144 0 46.8 86-32 192-32S384 46.8 384 144zm0 368c-94.1 0-172.4-62.1-188.8-144 120-1.5 224.3-86.9 235.8-202.7 83.3 19.2 145 88.3 145 170.7 0 39.6-14.3 76.2-38.4 105.6l35.6 67.2c4.9 9.3 3.2 20.7-4.2 28.2s-18.9 9.2-28.2 4.2L459.2 498c-23.1 9-48.5 14-75.2 14z",
  },
  translate: {
    viewBox: "0 0 576 512",
    path: "M160 0c17.7 0 32 14.3 32 32l0 32 128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-9.6 0-8.4 23.1c-16.4 45.2-41.1 86.5-72.2 122 14.2 8.8 29 16.6 44.4 23.5l50.4 22.4 62.2-140c5.1-11.6 16.6-19 29.2-19s24.1 7.4 29.2 19l128 288c7.2 16.2-.1 35.1-16.2 42.2s-35.1-.1-42.2-16.2l-20-45-157.5 0-20 45c-7.2 16.2-26.1 23.4-42.2 16.2s-23.4-26.1-16.2-42.2l39.8-89.5-50.4-22.4c-23-10.2-45-22.4-65.8-36.4-21.3 17.2-44.6 32.2-69.5 44.7L78.3 380.6c-15.8 7.9-35 1.5-42.9-14.3s-1.5-35 14.3-42.9l34.5-17.3c16.3-8.2 31.8-17.7 46.4-28.3-13.8-12.7-26.8-26.4-38.9-40.9L81.6 224.7c-11.3-13.6-9.5-33.8 4.1-45.1s33.8-9.5 45.1 4.1l10.2 12.2c11.5 13.9 24.1 26.8 37.4 38.7 27.5-30.4 49.2-66.1 63.5-105.4l.5-1.2-210.3 0C14.3 128 0 113.7 0 96S14.3 64 32 64l96 0 0-32c0-17.7 14.3-32 32-32zM416 270.8L365.7 384 466.3 384 416 270.8z",
  },
};

function CommunityIconGraphic({icon}: {icon: CommunityIcon}): React.JSX.Element {
  const {path, viewBox} = COMMUNITY_GLYPHS[icon];

  return (
    <Svg svgClass={styles.cardIcon} viewBox={viewBox}>
      <path fill="currentColor" d={path} />
    </Svg>
  );
}

function CommunityCard({icon, title, description, href}: CommunityLink): React.JSX.Element {
  return (
    <Link to={href} className={styles.card} target="_blank" rel="noopener noreferrer">
      <CommunityIconGraphic icon={icon} />
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
            <CommunityCard key={link.href} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}

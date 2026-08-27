import React, {type ReactNode} from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

/** Linked card used inside `<CardGrid>` on MDX documentation pages. */
export type CardProps = {
  /** Card heading. */
  title: string;
  /** Destination, internal or external. */
  to: string;
  /** Optional icon path, resolved against the site base URL. */
  icon?: string;
  /** Optional call-to-action label rendered at the foot of the card. */
  cta?: string;
  /** Card body copy. */
  children: ReactNode;
};

export default function Card({title, to, icon, cta, children}: CardProps): React.JSX.Element {
  const iconUrl = useBaseUrl(icon ?? "");

  return (
    <Link to={to} className={styles.card}>
      {icon ? <img src={iconUrl} alt="" width={56} height={56} className={styles.icon} loading="lazy" /> : null}
      <Heading as="h3" className={styles.title}>
        {title}
      </Heading>
      <div className={styles.description}>{children}</div>
      {cta ? <span className={styles.cta}>{cta} →</span> : null}
    </Link>
  );
}

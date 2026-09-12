import React, {useEffect, useRef, type ReactNode} from "react";
import Link from "@docusaurus/Link";
import {useLocation} from "@docusaurus/router";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type PackageCardProps = {
  name: string;
  description: string;
  sources: string[];
  legacyId?: string;
  children: ReactNode;
};

export default function PackageCard({
  name,
  description,
  sources,
  legacyId,
  children,
}: PackageCardProps): React.JSX.Element {
  const {hash} = useLocation();
  const details = useRef<HTMLDetailsElement>(null);
  useBrokenLinks().collectAnchor(name);

  useEffect(() => {
    const target = hash.slice(1);
    if (target !== name && (!legacyId || target !== legacyId)) return;
    const element = details.current;
    if (!element) return;
    element.open = true;
    const frame = requestAnimationFrame(() => element.scrollIntoView({block: "start"}));
    return () => cancelAnimationFrame(frame);
  }, [hash, name, legacyId]);

  return (
    <details ref={details} id={name} className={styles.card}>
      <summary className={styles.summary}>
        <Heading as="h3" id={legacyId ?? `${name}-package`} className={styles.title}>
          {name}
        </Heading>
        <span className={styles.description}>{description}</span>
        <span className={styles.sources} aria-label="Package sources">
          {sources.map((source) => (
            <span key={source} className={styles.badge}>
              {source}
            </span>
          ))}
        </span>
        <span className={styles.action}>
          <span className={styles.show}>View installation options</span>
          <span className={styles.hide}>Hide details</span>
        </span>
      </summary>
      <div className={styles.content}>
        <nav className={styles.links} aria-label={`${name} links`}>
          <Link to={`https://github.com/z-shell/${name}`}>
            View repository <span aria-hidden="true">↗</span>
          </Link>
          <Link to={`#${name}`}>
            Permalink <span aria-hidden="true">#</span>
          </Link>
        </nav>
        {children}
      </div>
    </details>
  );
}

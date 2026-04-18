import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

export default function HomeInstallCta(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.heading}>
          <Translate id="homepage.cta.heading" description="Install CTA heading">
            Ready to Supercharge Your Shell?
          </Translate>
        </Heading>
        <p className={styles.description}>
          <Translate id="homepage.cta.desc" description="Install CTA description">
            Get started with Zi in minutes. Fast installation, sensible defaults, and a vibrant ecosystem await.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link className={styles.primaryButton} to="/docs/getting_started/installation">
            <Translate id="homepage.cta.getstarted" description="Install CTA primary button">
              Get Started
            </Translate>
          </Link>
          <Link className={styles.secondaryButton} to="/ecosystem">
            <Translate id="homepage.cta.ecosystem" description="Install CTA secondary button">
              Browse Ecosystem
            </Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Translate from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import Player from "@site/src/components/Player";
import styles from "./styles.module.css";

export default function HomeShowcase(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalDots}>
                <span className={styles.dot} data-color="red" />
                <span className={styles.dot} data-color="yellow" />
                <span className={styles.dot} data-color="green" />
              </span>
              <span className={styles.terminalTitle} aria-hidden="true">
                <Translate id="homepage.showcase.terminalTitle" description="Terminal window title">
                  zi — plugin setup
                </Translate>
              </span>
            </div>
            <div className={styles.terminalBody}>
              <Player
                src="/cdn/cast/509113.cast"
                rows={18}
                cols={231}
                terminalFontFamily="var(--ifm-font-family-monospace)"
                terminalFontSize="var(--ifm-code-font-size)"
                fit={false}
                controls={false}
              />
            </div>
          </div>
          <div className={styles.textContent}>
            <Heading as="h2" className={styles.heading}>
              <Translate id="homepage.showcase.heading" description="Showcase section heading">
                Install Plugins in Seconds
              </Translate>
            </Heading>
            <span className={styles.badge}>▶ See it in action</span>
            <p className={styles.description}>
              <Translate id="homepage.showcase.desc" description="Showcase section description">
                See Zi in action — from installation to plugin setup and configuration.
              </Translate>
            </p>
            <p className={styles.subdesc}>
              <Translate id="homepage.showcase.subdesc" description="Showcase section sub-description">
                The recording shows a full plugin installation workflow — from fetching sources to setting up
                completions and reports.
              </Translate>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

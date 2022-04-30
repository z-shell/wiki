// @ts-nocheck
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function SocialHome() {
  return (
    <main className={SocialHome}>
      <div className="container" align="center">
        <Link href="https://twitter.com/zshell_zi">
          <p>
            <img
              loading="lazy"
              alt="An Awesome Image"
              width="80%"
              height="auto"
              src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/tweets/tweets.svg"
              alt="Recent Tweets"
            />
          </p>
        </Link>
        <Link href="https://dev.to/tag/zsh">
          <p>
            <img
              loading="lazy"
              alt="An Awesome Image"
              width="80%"
              height="auto"
              src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/rss/dev.tag.zsh.rss.svg"
              alt="dev.to/z-shell"
            />
          </p>
        </Link>
      </div>
    </main>
  );
}

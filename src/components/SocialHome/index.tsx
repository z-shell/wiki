// @ts-nocheck
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function SocialHome() {
  return (
    <div className={styles.SocialHome}>
      <Link href="https://twitter.com/zshell_zi">
        <p>
          <img
            className="ScreenViewMedium"
            src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/tweets/tweets.svg"
            alt="Recent Tweets"
          />
        </p>
      </Link>
      <Link href="https://dev.to/tag/zsh">
        <p>
          <img
            className="ScreenViewMedium"
            src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/rss/dev.tag.zsh.rss.svg"
            alt="RSS-DEV-TAG-ZSH"
          />
        </p>
      </Link>
    </div>
  );
}

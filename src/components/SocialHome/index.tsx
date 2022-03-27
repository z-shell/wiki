import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export function SocialHome() {
  return (
    <div className={styles.SocialHome}>
      <Link href="https://github.com/z-shell/community/discussions">
        <p>
          <img
            className="ScreenViewMedium"
            src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin.discussions.svg"
            alt="Discussions"
          />
        </p>
      </Link>
      <Link href="https://twitter.com/zshell_zi">
        <p>
          <img
            className="ScreenViewMedium"
            src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin.tweets.svg"
            alt="Recent Tweets"
          />
        </p>
      </Link>
      <Link href="https://dev.to/tag/zsh">
        <p>
          <img
            className="ScreenViewMedium"
            src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin.dev.tag.zsh.rss.svg"
            alt="RSS-DEV-TAG-ZSH"
          />
        </p>
      </Link>
    </div>
  );
}

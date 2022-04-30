// @ts-nocheck
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function SocialHome() {
  return (
    <main className={SocialHome}>
      <div className="container" align="center">
        <Link href="https://twitter.com/zshell_zi">
          <img
            alt="An Awesome Image"
            width="80%"
            height="auto"
            src="https://github.zshell.dev/.github/plugin/tweets/tweets.svg"
            alt="Recent Tweets"
          />
        </Link>
        <Link href="https://dev.to/tag/zsh">
          <img
            alt="An Awesome Image"
            width="80%"
            height="auto"
            src="https://github.zshell.dev/.github/plugin/rss/dev.tag.zsh.rss.svg"
            alt="dev.to/z-shell"
          />
        </Link>
      </div>
    </main>
  );
}

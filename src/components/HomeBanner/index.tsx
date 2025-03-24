// @ts-check

import Link from "@docusaurus/Link";
import Translate, {translate} from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

export default function HeroBanner(): React.JSX.Element {
  return (
    <div className={styles.hero} data-theme='dark'>
      <div className={styles.heroInner}>
        <Heading as='h1' className={styles.heroProjectTagline}>
          <img alt='Zi logo' className={styles.heroLogo} src={useBaseUrl("/img/logo.svg")} height='200' width='200' />
          <span
            className={styles.heroTitleTextHtml}
            dangerouslySetInnerHTML={{
              __html: translate({
                id: "homepage.hero.title",
                message: "A <b>Swiss Army</b> Knife for <b>Zsh</b> Unix <b>Shell</b>",
                description: "Home page hero title, can contain simple html tags",
              }),
            }}
          />
        </Heading>
        <div className={styles.indexCtas}>
          <Link className='button button--primary' to='/docs/getting_started/installation'>
            <Translate id='homepage.banner.button.1' description='The homepage get started button'>
              Get Started
            </Translate>
          </Link>
          <Link className='button button--secondary' to='/community'>
            <Translate id='homepage.banner.button.2' description='The homepage community button'>
              Community
            </Translate>
          </Link>
          <span className={styles.indexCtasGitHubButtonWrapper}>
            <iframe
              className={styles.indexCtasGitHubButton}
              src='https://ghbtns.com/github-btn.html?user=z-shell&amp;repo=zi&amp;type=star&amp;count=true&amp;size=large'
              width={230}
              height={30}
              title='GitHub Stars'
            />
            <iframe
              className={styles.indexCtasGitHubButton}
              src='https://ghbtns.com/github-btn.html?user=z-shell&amp;type=follow&count=false&size=large'
              width={230}
              height={30}
              title='Follow on GitHub'
            />
          </span>
        </div>
      </div>
    </div>
  );
}

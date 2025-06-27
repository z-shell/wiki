import React, {memo} from "react";
import Link from "@docusaurus/Link";
import Translate, {translate} from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

/**
 * Hero banner component for the homepage
 *
 * @returns A JSX element containing the hero banner
 */
function HeroBanner(): React.JSX.Element {
  const logoUrl = useBaseUrl("/img/logo.svg");
  const heroTitle = translate({
    id: "homepage.hero.title",
    message: "A <b>Swiss Army</b> Knife for <b>Zsh</b> Unix <b>Shell</b>",
    description: "Home page hero title, can contain simple html tags",
  });

  return (
    <section className={styles.hero} data-theme='dark'>
      <div className={styles.heroInner}>
        <Heading as='h1' className={styles.heroProjectTagline}>
          <img alt='Zi logo' className={styles.heroLogo} src={logoUrl} height='200' width='200' loading='eager' />
          <span
            className={styles.heroTitleTextHtml}
            // Using dangerouslySetInnerHTML is acceptable here as the content is from translations
            // and the HTML is limited to simple tags like <b>
            dangerouslySetInnerHTML={{
              __html: heroTitle,
            }}
          />
        </Heading>
        <div className={styles.indexCtas}>
          <Link
            className='button button--primary'
            to='/docs/getting_started/installation'
            aria-label='Get started with Zi installation'>
            <Translate id='homepage.banner.button.1' description='The homepage get started button'>
              Get Started
            </Translate>
          </Link>
          <Link className='button button--secondary' to='/community' aria-label='Go to the Zi community page'>
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
              loading='lazy'
              sandbox='allow-scripts allow-same-origin allow-popups'
            />
            <iframe
              className={styles.indexCtasGitHubButton}
              src='https://ghbtns.com/github-btn.html?user=z-shell&type=follow&count=false&size=large'
              width={230}
              height={30}
              title='Follow on GitHub'
              loading='lazy'
              sandbox='allow-scripts allow-same-origin allow-popups'
            />
          </span>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroBanner);

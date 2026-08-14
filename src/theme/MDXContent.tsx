import React, {useEffect} from "react";
import {useLocation} from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MDXContent from "@theme-original/MDXContent";

const FONT_AWESOME_STYLESHEET_ID = "font-awesome-stylesheet";

type SiteCustomFields = {
  fontAwesomeStylesheet?: string;
};

export default function MDXContentWrapper(props: React.ComponentProps<typeof MDXContent>): React.JSX.Element {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields as SiteCustomFields;
  const stylesheet = customFields.fontAwesomeStylesheet;

  useEffect(() => {
    const hasFontAwesomeIcon = Array.from(document.querySelectorAll<HTMLElement>("i[class]")).some(({classList}) =>
      Array.from(classList).some((className) => className.startsWith("fa-")),
    );

    if (!hasFontAwesomeIcon) {
      return;
    }

    if (!stylesheet) {
      throw new Error("Font Awesome icons are present, but no fontAwesomeStylesheet custom field is configured.");
    }

    const stylesheetUrl = new URL(stylesheet, document.baseURI).href;
    const existingElement = document.getElementById(FONT_AWESOME_STYLESHEET_ID);

    if (existingElement) {
      if (!(existingElement instanceof HTMLLinkElement) || existingElement.rel !== "stylesheet") {
        throw new Error(`Element #${FONT_AWESOME_STYLESHEET_ID} must be a stylesheet link.`);
      }
      if (existingElement.href !== stylesheetUrl) {
        throw new Error(`Element #${FONT_AWESOME_STYLESHEET_ID} already points to a different stylesheet.`);
      }
      return;
    }

    const link = document.createElement("link");
    link.id = FONT_AWESOME_STYLESHEET_ID;
    link.rel = "stylesheet";
    link.href = stylesheetUrl;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, [pathname, stylesheet]);

  return <MDXContent {...props} />;
}

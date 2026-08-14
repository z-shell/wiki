import React, {useEffect} from "react";
import {useLocation} from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MDXContent from "@theme-original/MDXContent";

const FONT_AWESOME_STYLESHEET_ID = "font-awesome-stylesheet";
const FONT_AWESOME_ICON_SELECTOR = 'i[class^="fa-"], i[class*=" fa-"]';

type SiteCustomFields = {
  fontAwesomeStylesheet?: string;
};

export default function MDXContentWrapper(props: React.ComponentProps<typeof MDXContent>): React.JSX.Element {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields as SiteCustomFields;
  const stylesheet = customFields.fontAwesomeStylesheet;

  useEffect(() => {
    if (!document.querySelector(FONT_AWESOME_ICON_SELECTOR)) {
      return;
    }

    if (!stylesheet) {
      console.error("Font Awesome icons are present, but no fontAwesomeStylesheet custom field is configured.");
      return;
    }

    const stylesheetUrl = new URL(stylesheet, document.baseURI).href;
    const existingElement = document.getElementById(FONT_AWESOME_STYLESHEET_ID);

    if (existingElement instanceof HTMLLinkElement && existingElement.rel === "stylesheet") {
      if (existingElement.href !== stylesheetUrl) {
        existingElement.href = stylesheetUrl;
      }
      return;
    }

    if (existingElement) {
      console.error(`Replacing non-stylesheet element #${FONT_AWESOME_STYLESHEET_ID}.`);
      existingElement.remove();
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

import React from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MDXContent from "@theme-original/MDXContent";

type SiteCustomFields = {
  fontAwesomeScript?: string;
};

export default function MDXContentWrapper(props: React.ComponentProps<typeof MDXContent>): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields as SiteCustomFields;

  return (
    <>
      {customFields.fontAwesomeScript ? (
        <Head>
          <script src={customFields.fontAwesomeScript} crossOrigin="anonymous" defer />
        </Head>
      ) : null}
      <MDXContent {...props} />
    </>
  );
}

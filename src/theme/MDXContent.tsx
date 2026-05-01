import React, {useEffect} from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MDXContent from "@theme-original/MDXContent";

type SiteCustomFields = {
  fontAwesomeScript?: string;
};

export default function MDXContentWrapper(props: React.ComponentProps<typeof MDXContent>): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields as SiteCustomFields;
  const src = customFields.fontAwesomeScript;

  useEffect(() => {
    if (src && !document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [src]);

  return <MDXContent {...props} />;
}

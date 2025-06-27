/**
 * Type declarations for Docusaurus-specific modules and hooks
 */

// Docusaurus specific declarations
declare module "@theme-original/*" {
  const content: any;
  export default content;
}

declare module "@docusaurus/Link" {
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module "@docusaurus/Translate" {
  const Translate: React.ComponentType<any>;
  export const translate: (id: string | {id: string; message: string; description: string}, options?: any) => string;
  export default Translate;
}

declare module "@docusaurus/useBaseUrl" {
  const useBaseUrl: (url: string, options?: any) => string;
  export default useBaseUrl;
}

declare module "@docusaurus/useDocusaurusContext" {
  const useDocusaurusContext: () => any;
  export default useDocusaurusContext;
}

declare module "@docusaurus/router" {
  export const useHistory: any;
}

declare module "@docusaurus/useBrokenLinks" {
  const useBrokenLinks: any;
  export default useBrokenLinks;
}

declare module "@theme/Layout" {
  const Layout: React.ComponentType<any>;
  export default Layout;
}

declare module "@theme/Heading" {
  const Heading: React.ComponentType<any>;
  export default Heading;
}

declare module "@theme/IdealImage" {
  const Image: React.ComponentType<any>;
  export default Image;
}

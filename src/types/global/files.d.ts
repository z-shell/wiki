/**
 * Global type declarations for various file types and assets
 * These declarations allow TypeScript to understand imports of non-TypeScript files
 */

// CSS Module declarations
declare module "*.module.css" {
  const classes: {readonly [key: string]: string};
  export default classes;
}

// Asset declarations
declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.ico" {
  const content: string;
  export default content;
}

// MDX declarations
declare module "*.mdx" {
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module "*.md" {
  const MDComponent: (props: any) => JSX.Element;
  export default MDComponent;
}

// Data declarations
declare module "*.json" {
  const content: any;
  export default content;
}

declare module "*.yaml" {
  const content: any;
  export default content;
}

declare module "*.yml" {
  const content: any;
  export default content;
}

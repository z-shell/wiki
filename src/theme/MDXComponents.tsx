import MDXComponents from "@theme-original/MDXComponents";

// Import all components from the barrel file
// This provides a central point of import for better maintainability
import {
  // UI Components
  Highlight,
  Spinner,
  Emoji,
  Icon,
  Svg,
  SvgExternal,
  ImgShow,

  // Interactive Components
  LinkRef,
  CommandBlock,
  TerminalOutput,
  Player,

  // Documentation Components
  CodeTabs,
  TabItem,
  VersionBadge,
  APITable,
  Note,
  Tip,
  Warning,
} from "@site/src/components";

/**
 * Custom MDX components that can be used in MDX files
 *
 * This registers all custom components for use in MDX files without requiring imports.
 * These components are then globally available in any MDX file throughout the documentation.
 *
 * To add a new component:
 * 1. Import it above (either from barrel file or directly)
 * 2. Add it to the export object below
 * 3. Update the component examples documentation
 */
export default {
  ...MDXComponents,
  // UI Components
  Highlight,
  Spinner,
  Emoji,
  Icon,
  Svg,
  SvgExternal,
  ImgShow,

  // Interactive Components
  LinkRef,
  CommandBlock,
  TerminalOutput,
  Player,

  // Documentation Components
  CodeTabs,
  TabItem,
  VersionBadge,
  APITable,

  // Callouts
  Note,
  Tip,
  Warning,
};

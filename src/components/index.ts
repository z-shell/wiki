/**
 * Component library barrel exports
 * This file provides a central export point for all custom components
 *
 * Usage:
 * - For component imports: import { ComponentName } from '@site/src/components'
 * - For MDXComponents.tsx: Some components may need direct imports (see comments below)
 * - For MDX files: Components registered in MDXComponents.tsx can be used without imports
 */

// ===== UI Components =====
// Basic UI elements for visual styling and formatting
export {default as Highlight} from "./Highlight";
export {default as Emoji} from "./Emoji";
export {default as Icon} from "./Icon";
export {default as Svg} from "./Svg";
export {default as SvgExternal} from "./SvgExternal";
export {default as ImgShow} from "./ImgShow";

// ===== Interactive Components =====
// Components that provide user interaction
export {default as LinkRef} from "./LinkRef";
export {default as CommandBlock} from "./CommandBlock";
export {default as TerminalOutput} from "./TerminalOutput";
export {default as Player} from "./Player";

// ===== Documentation Components =====
// Components specifically designed for documentation presentation
export {default as CodeTabs, TabItem} from "./CodeTabs";
export {default as VersionBadge} from "./VersionBadge";
export {default as APITable} from "./APITable";
export {Note, Tip, Warning} from "./Callouts";

// ===== Homepage Components =====
// Components used specifically for the homepage
export {default as HeroBanner} from "./HomeBanner";
export {default as HomeFeatures} from "./HomeFeatures";

// ===== Type Exports =====
// Centralized type definitions for components
export type * from "../types";

// ===== Spinner Component =====
// A component that shows a loading spinner
export {default as Spinner} from "./Spinner";

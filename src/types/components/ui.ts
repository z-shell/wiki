/**
 * Type definitions for the wiki component library
 * This file serves as the central source of component prop types
 */

import React from "react";
// We need to avoid circular imports, so we define a utility type for the link registry

// LinkRegistry types
export interface LinkInfo {
  /** The URL or path to the page */
  url: string;
  /** Whether this is an external link (not part of the documentation) */
  external: boolean;
  /** Optional description of what this link points to */
  description?: string;
}

// ===== UI Component Types =====

// Highlight component types
export interface HighlightProps {
  /** Content to be highlighted */
  children: React.ReactNode;
  /** Optional custom color for the highlight */
  color?: "primary" | "success" | "warning" | "danger" | "info";
  /** Optional class name for additional styling */
  className?: string;
  /** Optional title attribute for accessibility */
  title?: string;
}

// Spinner component types
export interface SpinnerProps {
  /** Size of the spinner */
  size?: "small" | "medium" | "large";
  /** Color of the spinner */
  color?: "primary" | "success" | "warning" | "danger";
  /** Optional class name for additional styling */
  className?: string;
  /** Whether the spinner is currently loading (not used in current implementation) */
  loading?: boolean;
}

// Emoji component types
export interface EmojiProps {
  /** The emoji name or code */
  name?: string;
  /** The emoji symbol (alternative to name) */
  symbol?: string;
  /** Optional class name for additional styling */
  className?: string;
  /** Optional label for accessibility */
  label?: string;
  /** Optional style object */
  style?: React.CSSProperties;
}

// Icon component types
export interface IconProps {
  /** Name of the icon to display */
  name: string;
  /** Optional class name for additional styling */
  className?: string;
  /** Optional title for accessibility */
  title?: string;
  /** Spin animation */
  spin?: boolean;
  /** Pulse animation */
  pulse?: boolean;
  /** Size of the icon */
  size?: "xs" | "sm" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x";
}

// CommandBlock component types
export interface CommandBlockProps {
  /** The command to display */
  children: string;
  /** Optional class name for additional styling */
  className?: string;
  /** The prompt to display before the command */
  prompt?: string;
  /** The language of the command */
  language?: "bash" | "shell";
}

// Terminal output component types
export interface TerminalOutputProps {
  /** The terminal output to display */
  children: React.ReactNode;
  /** Optional class name for additional styling */
  className?: string;
  /** Optional title for the terminal output */
  title?: string;
}

// CodeTabs component types
export interface CodeTabsProps {
  /** The tabs to display */
  children: React.ReactElement<TabItemProps> | React.ReactElement<TabItemProps>[];
  /** Optional class name for additional styling */
  className?: string;
}

export interface TabItemProps {
  /** The value of the tab */
  value: string;
  /** The label of the tab */
  label: string;
  /** The content of the tab */
  children: React.ReactNode;
  /** Whether the tab is the default tab */
  default?: boolean;
}

// Version badge component types
export interface VersionBadgeProps {
  /** The version to display */
  version: string;
  /** Optional type of the badge */
  type?: "stable" | "latest" | "next" | "beta" | "alpha";
  /** Optional class name for additional styling */
  className?: string;
}

// Callout component types
export interface CalloutProps {
  /** The content of the callout */
  children: React.ReactNode;
  /** Optional title for the callout */
  title?: string;
  /** Optional class name for additional styling */
  className?: string;
}

// Player component types
export interface PlayerProps {
  /** Source URL for the recording */
  src: string;
  /** Number of columns */
  cols?: number;
  /** Number of rows */
  rows?: number;
  /** Whether to autoplay the recording */
  autoPlay?: boolean;
  /** Whether to preload the recording */
  preload?: boolean;
  /** Whether to loop the recording or how many times to loop */
  loop?: boolean | number;
  /** Time to start playback from */
  startAt?: number | string;
  /** Playback speed */
  speed?: number;
  /** Limit for idle time */
  idleTimeLimit?: number;
  /** Theme for the terminal */
  theme?: string;
  /** Poster frame URL */
  poster?: string;
  /** How to fit the player */
  fit?: boolean | string;
  /** Terminal line height */
  terminalLineHeight?: number;
  /** Terminal font family */
  terminalFontFamily?: string;
  /** Terminal font size */
  terminalFontSize?: string;
  /** Whether to show controls */
  controls?: boolean | string;
  /** Time markers */
  markers?: string;
  /** Additional class name */
  className?: string;
}

// APITable component types
export interface APITableProps {
  /** The table element to render with enhanced functionality */
  readonly children: React.ReactElement<React.ComponentProps<"table">>;
  /** Optional namespace to prefix row IDs */
  readonly name?: string;
}

export interface APITableRowProps {
  /** Optional namespace to prefix row IDs */
  name: string | undefined;
  /** The table row to render */
  children: React.ReactElement<React.ComponentProps<"tr">>;
}

// ImgShow component types
export interface ImgProps {
  /** The image source path */
  img: string;
  /** Alt text for the image */
  alt: string;
  /** Optional label for the image */
  label?: string;
  /** Optional child content */
  children?: React.ReactNode;
  /** Additional props */
  [key: string]: any;
}

// LinkRef component types
export interface LinkRefProps {
  /** Reference key to a predefined link in the registry */
  to: string;
  /** Content to display for the link (optional, defaults to the key name) */
  children?: React.ReactNode;
  /** Whether the link should open in a new tab (default: true for external links) */
  newTab?: boolean;
  /** Visual style of the link */
  variant?: "default" | "button" | "subtle";
  /** Additional class name for custom styling */
  className?: string;
  /** Optional title/tooltip for the link */
  title?: string;
  /** Optional ID for the link element */
  id?: string;
}

// SvgExternal component types
export interface SvgExternalProps {
  /** External URL of the SVG to display */
  url: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional URL to link to when the SVG is clicked */
  href?: string;
  /** Width of the SVG container (default: "100%") */
  width?: string;
  /** Height of the SVG container (default: "auto") */
  height?: string;
  /** Optional class name to apply to the SVG container */
  className?: string;
  /** Optional title for accessibility (will be used as aria-labelledby) */
  title?: string;
  /** Additional inline styles to apply to the container */
  style?: React.CSSProperties;
}

// Svg component types
export interface SvgProps extends Omit<React.ComponentProps<"svg">, "color"> {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** Size of the SVG icon */
  size?: "small" | "medium" | "large" | "inherit";
  /** Color of the SVG icon */
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "inherit";
  /** Class applied to the SVG element */
  svgClass?: string;
  /** Applies a color attribute to the SVG element */
  colorAttr?: string;
  /** Content of the SVG element */
  children: React.ReactNode;
  /** Optional title for accessibility */
  title?: string;
  /** Additional class name */
  className?: string;
}

/**
 * Feature item type for homepage and similar feature lists
 */
export interface FeatureItem {
  title: string;
  icon: React.JSX.Element;
  description: React.JSX.Element;
  className?: string;
}

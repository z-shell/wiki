/**
 * Type declarations for component exports
 * This allows TypeScript to understand imports from the component library
 */

declare module "@site/src/components" {
  export const Highlight: React.ComponentType<import("./ui").HighlightProps>;
  export const Spinner: React.ComponentType<import("./ui").SpinnerProps>;
  export const Emoji: React.ComponentType<import("./ui").EmojiProps>;
  export const Icon: React.ComponentType<import("./ui").IconProps>;
  export const Svg: React.ComponentType<import("./ui").SvgProps>;
  export const SvgExternal: React.ComponentType<import("./ui").SvgExternalProps>;
  export const CommandBlock: React.ComponentType<import("./ui").CommandBlockProps>;
  export const Note: React.ComponentType<import("./ui").CalloutProps>;
  export const Tip: React.ComponentType<import("./ui").CalloutProps>;
  export const Warning: React.ComponentType<import("./ui").CalloutProps>;
  export const TerminalOutput: React.ComponentType<import("./ui").TerminalOutputProps>;
  export const CodeTabs: React.ComponentType<import("./ui").CodeTabsProps>;
  export const TabItem: React.ComponentType<import("./ui").TabItemProps>;
  export const VersionBadge: React.ComponentType<import("./ui").VersionBadgeProps>;
  export const Player: React.ComponentType<import("./ui").PlayerProps>;
  export const APITable: React.ComponentType<import("./ui").APITableProps>;
  export const ImgShow: React.ComponentType<import("./ui").ImgProps>;
  export const LinkRef: React.ComponentType<import("./ui").LinkRefProps>;
  export const HeroBanner: React.ComponentType<any>;
  export const HomeFeatures: React.ComponentType<any>;
}

// Individual component declarations (for backward compatibility)
declare module "@site/src/components/Highlight" {
  import {HighlightProps} from "./ui";
  const Highlight: React.ComponentType<HighlightProps>;
  export default Highlight;
}

declare module "@site/src/components/Spinner" {
  import {SpinnerProps} from "./ui";
  const Spinner: React.ComponentType<SpinnerProps>;
  export default Spinner;
}

declare module "@site/src/components/Emoji" {
  import {EmojiProps} from "./ui";
  const Emoji: React.ComponentType<EmojiProps>;
  export default Emoji;
}

declare module "@site/src/components/Icon" {
  import {IconProps} from "./ui";
  const Icon: React.ComponentType<IconProps>;
  export default Icon;
}

declare module "@site/src/components/CommandBlock" {
  import {CommandBlockProps} from "./ui";
  const CommandBlock: React.ComponentType<CommandBlockProps>;
  export default CommandBlock;
}

declare module "@site/src/components/TerminalOutput" {
  import {TerminalOutputProps} from "./ui";
  const TerminalOutput: React.ComponentType<TerminalOutputProps>;
  export default TerminalOutput;
}

declare module "@site/src/components/CodeTabs" {
  import {CodeTabsProps, TabItemProps} from "./ui";
  const CodeTabs: React.ComponentType<CodeTabsProps>;
  export const TabItem: React.ComponentType<TabItemProps>;
  export default CodeTabs;
}

declare module "@site/src/components/VersionBadge" {
  import {VersionBadgeProps} from "./ui";
  const VersionBadge: React.ComponentType<VersionBadgeProps>;
  export default VersionBadge;
}

declare module "@site/src/components/Player" {
  import {PlayerProps} from "./ui";
  const Player: React.ComponentType<PlayerProps>;
  export default Player;
}

declare module "@site/src/components/Callouts" {
  import {CalloutProps} from "./ui";
  export const Note: React.ComponentType<CalloutProps>;
  export const Tip: React.ComponentType<CalloutProps>;
  export const Warning: React.ComponentType<CalloutProps>;
}

declare module "@site/src/components/Svg" {
  import {SvgProps} from "./ui";
  const Svg: React.ComponentType<SvgProps>;
  export default Svg;
}

declare module "@site/src/components/SvgExternal" {
  import {SvgExternalProps} from "./ui";
  const SvgExternal: React.ComponentType<SvgExternalProps>;
  export default SvgExternal;
}

declare module "@site/src/components/HomeBanner" {
  const HomeBanner: React.ComponentType<any>;
  export default HomeBanner;
}

declare module "@site/src/components/HomeFeatures" {
  const HomeFeatures: React.ComponentType<any>;
  export default HomeFeatures;
}

declare module "@site/src/components/APITable" {
  import {APITableProps} from "./ui";
  const APITable: React.ComponentType<APITableProps>;
  export default APITable;
}

declare module "@site/src/components/ImgShow" {
  import {ImgProps} from "./ui";
  const ImgShow: React.ComponentType<ImgProps>;
  export default ImgShow;
}

declare module "@site/src/components/LinkRef" {
  import {LinkRefProps} from "./ui";
  const LinkRef: React.ComponentType<LinkRefProps>;
  export default LinkRef;
}

import React, {type ReactNode} from "react";
import CodeBlock from "@theme/CodeBlock";

export type ShellCodeCopyProps = {
  children: ReactNode;
  /** Language for syntax highlighting, defaults to "shell" */
  language?: string;
  /** Title shown above the code block */
  title?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
};

export default function ShellCodeCopy({
  children,
  language = "shell",
  title,
  showLineNumbers,
}: ShellCodeCopyProps): React.JSX.Element {
  return (
    <CodeBlock language={language} title={title} showLineNumbers={showLineNumbers}>
      {children}
    </CodeBlock>
  );
}

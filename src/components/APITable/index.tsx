import React, {
  Children,
  forwardRef,
  type ComponentProps,
  type ForwardedRef,
  type KeyboardEvent,
  type ReactElement,
  isValidElement,
  useRef,
  useEffect,
} from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import {useHistory} from "@docusaurus/router";
import styles from "./styles.module.css";

type Props = {
  readonly children: ReactElement<ComponentProps<"table">>;
  readonly name?: string;
};

// ReactNode equivalent of HTMLElement#innerText
function getRowName(node: ReactElement): string {
  let curNode: ReactNode = node;
  while (isValidElement(curNode)) {
    [curNode] = Children.toArray((curNode.props as {children?: ReactNode}).children);
  }
  if (typeof curNode !== "string") {
    throw new Error(`Could not extract APITable row name from JSX tree:\n${JSON.stringify(node, null, 2)}`);
  }
  return curNode as string;
}

function APITableRow(
  {name, children}: {name: string | undefined; children: ReactElement<ComponentProps<"tr">>},
  ref: ForwardedRef<HTMLTableRowElement>,
) {
  const entryName = getRowName(children);
  const id = name ? `${name}-${entryName}` : entryName;
  const anchor = `#${id}`;
  const history = useHistory();
  useBrokenLinks().collectAnchor(id);
  return (
    <tr
      id={id}
      tabIndex={0}
      ref={history.location.hash === anchor ? ref : undefined}
      onClick={(e) => {
        const isTDClick = (e.target as HTMLElement).tagName.toUpperCase() === "TD";
        const hasSelectedText = !!window.getSelection()?.toString();

        const shouldNavigate = isTDClick && !hasSelectedText;
        if (shouldNavigate) {
          history.push(anchor);
        }
      }}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          history.push(anchor);
        }
      }}
    >
      {children.props.children}
    </tr>
  );
}

const APITableRowComp = forwardRef(APITableRow);

/*
 * Note: this is not a quite robust component since it makes a lot of
 * assumptions about how the children looks; however, those assumptions
 * should be generally correct in the MDX context.
 */
export default function APITable({children, name}: Props): React.JSX.Element {
  if (children.type !== "table") {
    throw new Error(
      "Bad usage of APITable component.\nIt is probably that your Markdown table is malformed.\nMake sure to double-check you have the appropriate number of columns for each table row.",
    );
  }
  const [thead, tbody] = Children.toArray(children.props.children) as [
    ReactElement<{children: ReactElement<ComponentProps<"tr">>[]}>,
    ReactElement<{children: ReactElement<ComponentProps<"tr">>[]}>,
  ];
  const highlightedRow = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    highlightedRow.current?.focus();
  }, []);
  const rows = Children.map(tbody.props.children, (row: ReactElement<ComponentProps<"tr">>) => (
    <APITableRowComp key={getRowName(row)} name={name} ref={highlightedRow}>
      {row}
    </APITableRowComp>
  ));

  return (
    <table className={styles.apiTable}>
      {thead}
      <tbody>{rows}</tbody>
    </table>
  );
}

import React, {type ReactElement, type ReactNode, isValidElement, memo, Children} from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import {useHistory} from "@docusaurus/router";
import type {APITableRowProps} from "../../types";

/**
 * Extracts all text content from a React node.
 */
function getReactNodeText(node: ReactNode): string {
  if (node === null || typeof node === "boolean" || typeof node === "undefined") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return node.toString();
  }
  if (Array.isArray(node)) {
    return node.map(getReactNodeText).join("");
  }
  if (isValidElement(node)) {
    const props = node.props as {children?: ReactNode};
    if (props.children) {
      return getReactNodeText(props.children);
    }
  }
  return "";
}

/**
 * Extracts the text content from the first cell of a row and slugifies it.
 */
function getRowName(rowElement: ReactElement): string {
  const rowChildren = Children.toArray((rowElement.props as {children?: ReactNode}).children);
  const firstCell = rowChildren[0];

  if (isValidElement(firstCell)) {
    const text = getReactNodeText((firstCell.props as {children?: ReactNode}).children);
    // Slugify the text to create a valid ID
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
  return "";
}

/**
 * Enhanced table row that supports navigation and accessibility
 */
const APITableRow = memo(
  React.forwardRef<HTMLTableRowElement, APITableRowProps>(({name, children}, ref) => {
    const entryName = getRowName(children);
    const id = name ? `${name}-${entryName}` : entryName;
    const anchor = `#${id}`;
    const history = useHistory();
    useBrokenLinks().collectAnchor(id);

    // Handle click on table row
    const handleClick = (e: React.MouseEvent) => {
      const isTDClick = (e.target as HTMLElement).tagName.toUpperCase() === "TD";
      const hasSelectedText = !!window.getSelection()?.toString();

      const shouldNavigate = isTDClick && !hasSelectedText;
      if (shouldNavigate) {
        history.push(anchor);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        history.push(anchor);
      }
    };

    return (
      <tr
        id={id}
        tabIndex={0}
        ref={history.location.hash === anchor ? ref : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={history.location.hash === anchor ? "theme-api-table-row-active" : undefined}>
        {children.props.children}
      </tr>
    );
  }),
);

export default APITableRow;

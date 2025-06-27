import React, {useState} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type {CodeTabsProps, TabItemProps} from "../../types";

export {default as TabItem} from "./TabItem";

/**
 * Component for showing the same code in multiple languages/shells
 */
export default function CodeTabs({children, className}: CodeTabsProps): React.JSX.Element {
  // Convert to array if single child
  const childrenArray = React.Children.toArray(children) as React.ReactElement<TabItemProps>[];

  // Find default tab or use first tab
  const defaultTab = childrenArray.find((child) => child.props.default)?.props.value || childrenArray[0]?.props.value;

  const [activeTab, setActiveTab] = useState(defaultTab);

  // Get all tab values and labels
  const tabs = childrenArray.map((child) => ({
    value: child.props.value,
    label: child.props.label,
  }));

  // Get content of active tab
  const activeContent = childrenArray.find((child) => child.props.value === activeTab)?.props.children;

  return (
    <div className={clsx(styles.codeTabs, className)}>
      <div className={styles.tabList} role='tablist'>
        {tabs.map(({value, label}) => (
          <button
            key={value}
            className={clsx(styles.tabItem, {
              [styles.tabItemActive]: activeTab === value,
            })}
            role='tab'
            aria-selected={activeTab === value}
            onClick={() => setActiveTab(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent} role='tabpanel'>
        {activeContent}
      </div>
    </div>
  );
}

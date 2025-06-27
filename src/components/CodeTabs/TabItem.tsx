import React from "react";
import type {TabItemProps} from "../../types";

export default function TabItem({value: _value, label: _label, children}: TabItemProps): React.JSX.Element {
  // This component is just a container for content
  // The actual rendering happens in the CodeTabs component
  return <>{children}</>;
}

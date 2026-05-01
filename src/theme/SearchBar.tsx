import React, {useEffect} from "react";
import SearchBar from "@theme-original/SearchBar";

export default function SearchBarWrapper(props: React.ComponentProps<typeof SearchBar>): React.JSX.Element {
  useEffect(() => {
    const keysSpan = document.querySelector(".DocSearch-Button-Keys");
    if (keysSpan && !keysSpan.getAttribute("aria-hidden")) {
      keysSpan.setAttribute("aria-hidden", "true");
    }
  }, []);

  return <SearchBar {...props} />;
}

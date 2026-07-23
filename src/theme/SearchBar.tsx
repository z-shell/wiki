import React, {useEffect} from "react";
import SearchBar from "@theme-original/SearchBar";

export default function SearchBarWrapper(props: React.ComponentProps<typeof SearchBar>): React.JSX.Element {
  useEffect(() => {
    const setAriaHiddenIfPresent = (): boolean => {
      const keysSpan = document.querySelector(".DocSearch-Button-Keys");
      if (keysSpan && !keysSpan.getAttribute("aria-hidden")) {
        keysSpan.setAttribute("aria-hidden", "true");
      }
      return Boolean(keysSpan);
    };

    if (setAriaHiddenIfPresent()) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (setAriaHiddenIfPresent()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      observer.disconnect();
    };
  }, []);

  return <SearchBar {...props} />;
}

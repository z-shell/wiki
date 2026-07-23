import React, {useEffect} from "react";
import SearchBar from "@theme-original/SearchBar";

export default function SearchBarWrapper(props: React.ComponentProps<typeof SearchBar>): React.JSX.Element {
  useEffect(() => {
    const setAriaHidden = (keysSpan: Element): void => {
      if (!keysSpan.getAttribute("aria-hidden")) {
        keysSpan.setAttribute("aria-hidden", "true");
      }
    };

    const initialKeysSpan = document.querySelector(".DocSearch-Button-Keys");
    if (initialKeysSpan) {
      setAriaHidden(initialKeysSpan);
      return;
    }

    const observerTarget = document.querySelector(".navbar");
    if (!observerTarget) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) {
            continue;
          }

          const foundKeysSpan = node.matches(".DocSearch-Button-Keys") ? node : node.querySelector(".DocSearch-Button-Keys");
          if (foundKeysSpan) {
            setAriaHidden(foundKeysSpan);
            observer.disconnect();
            return;
          }
        }
      }
    });

    observer.observe(observerTarget, {childList: true, subtree: true});

    return (): void => {
      observer.disconnect();
    };
  }, []);

  return <SearchBar {...props} />;
}

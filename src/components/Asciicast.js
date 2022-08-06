/** @format */

import React from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";

const AsciinemaPlayer = Loadable(() =>
  import("@site/src/components/AsciinemaPlayer")
);

export default function Asciicast({ src, children, ...props }) {
  return (
    <div className='ScreenView'>
      <AsciinemaPlayer
        fallback={<Spinner />}
        src={src}
        {...props}
      >
        {children}
      </AsciinemaPlayer>
    </div>
  );
}

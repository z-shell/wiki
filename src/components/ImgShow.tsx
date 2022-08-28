/** @format */
// @ts-check

import React, { type ReactNode } from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";

function Load(spinner) {
  return Loadable(spinner, { fallback: <Spinner /> });
}

const LoadImage = Load(() => import("@theme/IdealImage"));

export default function ImgShow({
  img,
  alt,
  children,
}: {
  img: string;
  alt: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className='ScreenView'>
      <LoadImage
        className='ImageView'
        img={img}
        alt={alt}
      />
      {children}
    </div>
  );
}

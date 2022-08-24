/** @format */
// @ts-check

import React from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";

const LoadImage = Loadable(() => import("@theme/IdealImage"));

export default function ImgShow({ ...props }): JSX.Element {
  return (
    <span>
      <div className='ScreenView'>
        <LoadImage
          className='ImageView'
          fallback={<Spinner />}
          {...props}
        />
      </div>
    </span>
  );
}

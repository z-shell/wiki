/** @format */
// @ts-check

import React, { type ReactNode } from "react";
import clsx from "clsx";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";
import styles from "./styles.module.css";

function Load(spinner) {
  return Loadable(spinner, { fallback: <Spinner /> });
}

export interface ImgShowProps extends React.HTMLAttributes<HTMLSpanElement> {
  alt?: string;
  children: ReactNode;
  className?: string;
  height: number;
  width: number;
}

export default function ImgShow(props: ImgShowProps): JSX.Element {
  const { alt, width, height, children, ...rest } = props;
  const Image = Load(
    () => import(/* webpackPrefetch: true */ "@theme/IdealImage")
  );
  return (
    <span className={clsx(styles.ImgClass)}>
      <Image
        width={width}
        height={height}
        alt={alt}
        {...rest}
      >
        {children}
      </Image>
    </span>
  );
}

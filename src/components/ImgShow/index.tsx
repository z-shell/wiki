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
  img: string;
  alt: string;
  children: ReactNode;
  className?: string;
  height?: number;
  width?: number;
}

export default function ImgShow(props: ImgShowProps): JSX.Element {
  const { img, alt, children, ...rest } = props;
  const Image = Load(() => import("@theme/IdealImage"));
  return (
    <span className={clsx(styles.ImgClass)}>
      <Image
        alt={alt}
        img={img}
        {...rest}
      >
        {children}
      </Image>
    </span>
  );
}

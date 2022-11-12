/** @format */
// @ts-check

import React, { type ReactNode } from "react";
import clsx from "clsx";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";
import styles from "./styles.module.css";

export default function ImgShow({
  img,
  alt,
  children,
  ...rest
}: {
  img: string;
  alt: string;
  children: ReactNode;
  className?: string;
  height?: number;
  width?: number;
}): JSX.Element {
  const Image = Loadable(() => import("@theme/IdealImage"));
  return (
    <span className={clsx(styles.ImgClass)}>
      <Image
        fallback={<Spinner />}
        alt={alt}
        img={img}
        {...rest}
      >
        {children}
      </Image>
    </span>
  );
}

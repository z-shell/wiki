import React from "react";
import clsx from "clsx";
import type {Props as IdealImageProps} from "@theme/IdealImage";
import Image from "@theme/IdealImage";
import styles from "./styles.module.css";

export type ImgShowProps = Omit<IdealImageProps, "img"> & {
  img: IdealImageProps["img"];
};

export default function ImgShow({img, className, ...rest}: ImgShowProps): React.JSX.Element {
  return <Image img={img} className={clsx(styles.image, className)} {...rest} />;
}

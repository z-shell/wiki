import React from "react";
import clsx from "clsx";
import Image from "@theme/IdealImage";
import type {Props as IdealImageProps} from "@theme/IdealImage";
import styles from "./styles.module.css";

export type ImgShowProps = Omit<IdealImageProps, "img"> & {
  img: IdealImageProps["img"];
};

export default function ImgShow(props: ImgShowProps): React.JSX.Element {
  const {img, className, ...rest} = props;
  return <Image img={img} className={clsx(styles.image, className)} {...rest} />;
}

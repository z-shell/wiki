// @ts-check

import React, {type ReactNode} from "react";
import Loadable from "@loadable/component";
import Spinner from "@site/src/components/Spinner";
import styles from "./styles.module.css";

export type ImgProps = {
  img: string;
  alt: string;
  label?: string;
  children?: ReactNode;
};

export default function ImgShow(props: ImgProps): JSX.Element {
  const {img, alt, label, children, ...rest} = props;
  const Image = Loadable(() => import("@theme/IdealImage"));
  return (
    <Image
      fallback={<Spinner />}
      alt={alt}
      img={img}
      className={styles.ImgClass}
      aria-hidden={label != null ? undefined : true}
      aria-label={label ?? undefined}
      role='img'
      {...rest}>
      {children}
    </Image>
  );
}

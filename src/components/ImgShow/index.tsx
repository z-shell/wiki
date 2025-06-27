import React from "react";
import Image from "@theme/IdealImage";
import styles from "./styles.module.css";
import type {ImgProps} from "../../types";

export default function ImgShow(props: ImgProps): React.JSX.Element {
  const {img, alt, label, children, ...rest} = props;
  return (
    <Image
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

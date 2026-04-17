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

const Image = Loadable(() => import("@theme/IdealImage"));

export default function ImgShow(props: ImgProps): React.JSX.Element {
  const {img, alt, label, children, ...rest} = props;
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

import React, {Suspense, lazy, type ReactNode} from "react";
import Spinner from "@site/src/components/Spinner";
import styles from "./styles.module.css";

export type ImgProps = {
  img: string;
  alt: string;
  label?: string;
  children?: ReactNode;
};

const Image = lazy(() => import("@theme/IdealImage"));

export default function ImgShow(props: ImgProps): React.JSX.Element {
  const {img, alt, label, children, ...rest} = props;
  return (
    <Suspense fallback={<Spinner />}>
      <Image
        alt={alt}
        img={img}
        className={styles.image}
        aria-hidden={label != null ? undefined : true}
        aria-label={label ?? undefined}
        role="img"
        {...rest}
      >
        {children}
      </Image>
    </Suspense>
  );
}

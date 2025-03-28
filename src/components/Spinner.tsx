// @ts-check

import React, {useState, CSSProperties} from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  color: "var(--ifm-color-primary)",
  display: "block",
  margin: "0 auto",
};

export default function Spinner(): React.JSX.Element {
  const [loading] = useState(true);
  const [color] = useState("#00ffcc");
  return (
    <div className='sweet-loading'>
      <ClipLoader
        size={200}
        color={color}
        loading={loading}
        speedMultiplier={0.8}
        cssOverride={override}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}

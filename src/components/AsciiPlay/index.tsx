// @ts-nocheck

import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import AsciinemaPlayer from '@site/src/components/AsciinemaPlayer';

const AsciiPlay = () => {
  return (
    <BrowserOnly>
      {() => (
        <AsciinemaPlayer
          src="/asciicast/demo.cast"
          cols={210}
          rows={30}
          idleTimeLimit={3}
          preload={true}
        />
      )}
    </BrowserOnly>
  );
};

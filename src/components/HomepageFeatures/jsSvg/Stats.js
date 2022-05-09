import * as React from 'react';

function Stats(props) {
  return (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
      <g fill="#37474F">
        <path d="M23 5h2v36h-2z" />
        <path d="M25.817 32.772l1.414 1.414-10.04 10.04-1.414-1.414z" />
        <path d="M32.259 42.824l-1.414 1.414-10.04-10.04 1.414-1.414z" />
      </g>
      <path fill="#CFD8DC" d="M4 8h40v28H4z" />
      <g fill="#607D8B">
        <path d="M3 7h42v4H3zm0 28h42v2H3z" />
        <circle cx={31.5} cy={43.5} r={1.5} />
        <circle cx={16.5} cy={43.5} r={1.5} />
      </g>
      <g fill="#C51162">
        <path d="M31.9 18.9l-5.9 6-6-6-8.1 8 2.2 2.2 5.9-6 6 6 8.1-8z" />
        <path d="M36 24l-7-7h7z" />
      </g>
    </svg>
  );
}

const MemoStats = React.memo(Stats);
export default MemoStats;
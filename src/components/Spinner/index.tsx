/** @format */

import React, { useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	color: 'var(--ifm-color-primary)',
};

function Spinner(): JSX.Element {
	const loading = useState(true);
	const color = useState('#ffffff');
	return (
		<div className='sweet-loading'>
			<ClipLoader
				color={color}
				loading={loading}
				cssOverride={override}
				size={320}
			/>
		</div>
	);
}

export default Spinner;

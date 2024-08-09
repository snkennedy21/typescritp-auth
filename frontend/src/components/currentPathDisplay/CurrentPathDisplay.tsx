import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const CurrentPathDisplay = () => {
	const location = useLocation().pathname;
	const pathArray = location.split('/').filter(Boolean);

	let fullPath = '';

	return (
		<nav>
			{pathArray.map((section, index) => {
				fullPath += `/${section}`;

				return (
					<span key={index}>
						<NavLink to={fullPath}>{section}</NavLink>
						{index < pathArray.length - 1 && ' / '}
					</span>
				);
			})}
		</nav>
	);
};

export default CurrentPathDisplay;

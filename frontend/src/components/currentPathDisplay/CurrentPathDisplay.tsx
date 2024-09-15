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

				// Check if it's the last element
				const isLast = index === pathArray.length - 1;

				return (
					<span key={index}>
						{isLast ? (
							<span className="font-bold">{section}</span>
						) : (
							<NavLink
								to={fullPath}
								className="hover:text-blue-300"
							>
								{section}
							</NavLink>
						)}
						{index < pathArray.length - 1 && ' / '}
					</span>
				);
			})}
		</nav>
	);
};

export default CurrentPathDisplay;

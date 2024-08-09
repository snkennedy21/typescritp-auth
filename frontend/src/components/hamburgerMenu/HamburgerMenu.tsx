import React from 'react';

function HamburgerMenu({ openMobileNav }) {
	return (
		<div className="p-4 bg-gray-200">
			<button onClick={openMobileNav} className="text-xl font-bold">
				☰
			</button>
			{/* Implement the menu toggle functionality here */}
		</div>
	);
}

export default HamburgerMenu;

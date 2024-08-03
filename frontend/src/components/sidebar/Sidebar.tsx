import React from 'react';

function Sidebar() {
	return (
		<div className="p-4 h-full flex flex-col">
			<h2 className="text-xl font-bold text-right">Nav Links</h2>
			<ul className="mt-4 flex-grow">
				<li className="my-2 text-right">Nav Link</li>
				<li className="my-2 text-right">Nav Link</li>
				<li className="my-2 text-right">Nav Link</li>
				<li className="my-2 text-right">Nav Link</li>
				<li className="my-2 text-right">Nav Link</li>
				<li className="my-2 text-right">Nav Link</li>
			</ul>
		</div>
	);
}

export default Sidebar;

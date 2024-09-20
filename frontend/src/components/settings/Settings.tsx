import { useState, useEffect } from 'react';

const Settings = () => {
	// Load the initial dark mode preference from localStorage, default to false (light mode)
	const [darkMode, setDarkMode] = useState(() => {
		const storedMode = localStorage.getItem('theme');
		return storedMode === 'dark' ? true : false;
	});

	// Toggle dark mode
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	// Apply dark or light class to the document element and store the preference in localStorage
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark'); // Store dark mode preference
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light'); // Store light mode preference
		}
	}, [darkMode]);

	return (
		<div className="flex items-center space-x-2">
			<span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
			<label className="relative inline-block w-12 h-6">
				<input
					type="checkbox"
					checked={darkMode}
					onChange={toggleDarkMode}
					className="opacity-0 w-0 h-0"
				/>
				<span
					className={`absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-colors duration-300 
            ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
				></span>
				<span
					className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 
            ${darkMode ? 'transform translate-x-6' : ''}`}
				></span>
			</label>
		</div>
	);
};

export default Settings;

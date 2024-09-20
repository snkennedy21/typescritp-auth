import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/authProvider/AuthProvider';
import ApplicationLayout from './components/applicationLayout/ApplicationLayout';

function App() {
	const [darkMode, setDarkMode] = useState(() => {
		// Check localStorage for the initial theme preference
		const storedMode = localStorage.getItem('theme');
		return storedMode === 'dark';
	});

	// Apply dark or light class to the document element and update localStorage
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [darkMode]);

	return (
		<React.Fragment>
			<BrowserRouter>
				<AuthProvider>
					<ApplicationLayout />
				</AuthProvider>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;

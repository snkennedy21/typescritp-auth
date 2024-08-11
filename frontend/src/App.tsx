import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/authProvider/AuthProvider';
import ApplicationLayout from './components/applicationLayout/ApplicationLayout';

function App() {
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

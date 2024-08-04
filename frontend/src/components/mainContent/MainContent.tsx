import React from 'react';
import Signup from '../../components/signup/Signup';
import Navigation from '../../components/navigation/Navigation';
import Login from '../../components/login/Login';
import Home from '../../components/home/Home';
import TestAuth from '../../components/protectedEndpoint/ProtectedEndpoint';
import NotFound from '../../components/notFound/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UnprotectedEndpoint from '../../components/unprotectedEndpoint/unprotectedEndpoint';
import AuthProvider from '../../components/authProvider/AuthProvider';

import Sidebar from '../../components/sidebar/Sidebar';
import AdditionalLinks from '../../components/additionalLinks/AdditionalLinks';
import HamburgerMenu from '../../components/hamburgerMenu/HamburgerMenu';

function MainContent() {
	return (
		<>
			<div className="p-4">
				<h1 className="text-3xl font-bold">Main Content of the page</h1>
				{/* <BrowserRouter> */}
				{/* <AuthProvider> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/protected" element={<TestAuth />} />
					<Route
						path="/unprotected"
						element={<UnprotectedEndpoint />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
				{/* </AuthProvider> */}
				{/* </BrowserRouter> */}
			</div>
			<div className="bg-gray-100 lg:hidden">
				<AdditionalLinks />
			</div>
		</>
	);
}

export default MainContent;

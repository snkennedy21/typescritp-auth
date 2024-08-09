import React from 'react';
import Signup from '../../components/signup/Signup';
import Navigation from '../../components/navigation/Navigation';
import Login from '../../components/login/Login';
import Home from '../../components/home/Home';
import TestAuth from '../../components/protectedEndpoint/ProtectedEndpoint';
import NotFound from '../../components/notFound/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UnprotectedEndpoint from '../../components/unprotectedEndpoint/unprotectedEndpoint';

import A from '../accordion/subsections/A';
import A1 from '../accordion/subsections/A1';
import A1a from '../accordion/subsections/A1a';
import A1ai from '../accordion/subsections/A1ai';
import A1b from '../accordion/subsections/A1b';
import A2 from '../accordion/subsections/A2';
import A3 from '../accordion/subsections/A3';
import A3a from '../accordion/subsections/A3a';
import B from '../accordion/subsections/B';
import B1 from '../accordion/subsections/B1';
import B2 from '../accordion/subsections/B2';
import B2a from '../accordion/subsections/B2a';
import B2ai from '../accordion/subsections/B2ai';

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

					{/* Test Routes */}
					<Route path="/a" element={<A />} />
					<Route path="/a/1" element={<A1 />} />
					<Route path="/a/1/a" element={<A1a />} />
					<Route path="/a/1/a/i" element={<A1ai />} />
					<Route path="/a/1/b" element={<A1b />} />
					<Route path="/a/2" element={<A2 />} />
					<Route path="/a/3" element={<A3 />} />
					<Route path="/a/3/a" element={<A3a />} />

					<Route path="/b" element={<B />} />
					<Route path="/b/1" element={<B1 />} />
					<Route path="/b/2" element={<B2 />} />
					<Route path="/b/2/a" element={<B2a />} />
					<Route path="/b/2/a/i" element={<B2ai />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
				{/* </AuthProvider> */}
				{/* </BrowserRouter> */}
			</div>
			{/* <div className="bg-gray-100 lg:hidden">
				<AdditionalLinks />
			</div> */}
		</>
	);
}

export default MainContent;

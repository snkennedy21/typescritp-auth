import React, { useEffect, useState } from 'react';
import { closeMobileNavigation } from '../../store/navigationSlice';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './css/Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/mainApi';
import { unauthenticateUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearLocalStorageUserData } from '../../utils/localStorageUserData';
import { RootState } from '../../store/store';
import Accordion from '../accordion/Accordion';

function Sidebar({ isMobile = false }) {
	const mobileNavOpen = useSelector(
		(state: RootState) => state.navigationSlice.mobileNavOpen,
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [logout] = useLogoutMutation();
	const [accordions, setAccordions] = useState([
		{
			text: 'Kubernetes',
			link: '/kubernetes',
			open: false,
			subsections: [
				{
					text: 'Pods',
					link: '/kubernetes/pods',
					open: false,
					subsections: [
						{
							text: 'Pods A',
							link: '/kubernetes/pods/a',
						},
						{
							text: 'Pods B',
							link: '/kubernetes/pods/b',
						},
					],
				},
				{
					text: 'A2',
					link: '/kubernetes/2',
					open: false,
				},
				{
					text: 'A3',
					link: '/kubernetes/3',
					open: false,
					subsections: [
						{
							text: 'A3a',
							link: '/kubernetes/3/a',
						},
					],
				},
			],
		},
		{
			text: 'Other Tech',
			link: '/other',
			open: false,
			subsections: [
				{
					text: 'B1',
					link: '/other/1',
					open: false,
				},
				{
					text: 'B2',
					link: '/other/2',
					open: false,
					subsections: [
						{
							text: 'B2a',
							link: '/other/2/a',
							open: false,
							subsections: [
								{
									text: 'B2ai',
									link: '/other/2/a/i',
									open: false,
								},
							],
						},
					],
				},
				{
					text: 'B3',
					link: '/other/3',
					open: false,
				},
			],
		},
	]);
	const currentUser = useSelector(
		(state: RootState) => state.auth.currentUser,
	);
	const location = useLocation();

	const updateAccordionState = (accordions, path, basePath = '') => {
		const segments = path.split('/').filter(Boolean); // split the path and filter out empty strings

		return accordions.map((accordion) => {
			// Build the current path by appending the next segment
			const currentPath = `${basePath}/${segments[0]}`.replace('//', '/');

			// Remove the first segment as it has been used
			const remainingSegments = segments.slice(1);

			if (accordion.link === currentPath) {
				accordion.open = true;

				// If there are remaining segments and subsections, recurse
				if (accordion.subsections && remainingSegments.length > 0) {
					accordion.subsections = updateAccordionState(
						accordion.subsections,
						remainingSegments.join('/'),
						currentPath, // Pass down the currentPath to the next level
					);
				}
			} else {
				accordion.open = false;
			}

			return accordion;
		});
	};

	useEffect(() => {
		const updatedAccordions = updateAccordionState(
			accordions,
			location.pathname,
		);
		setAccordions(updatedAccordions); // Assuming you have a state setter for accordions
	}, [location.pathname]);

	const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
		// Prevent default navigation
		event.preventDefault();

		// Clear tokens from cookies
		logout();

		// Clear user data from local storage
		clearLocalStorageUserData();

		// Clear user data from redux store
		dispatch(unauthenticateUser());

		// Navigate to home page
		navigate('/');
	};

	// const accordions = [

	// ];

	if (isMobile) {
		return (
			<div
				className={`
				p-4 h-full flex flex-col overflow-y-scroll 
				absolute bg-gray-300 top-0 z-20 w-1/2 
				transition-transform duration-300 
				${mobileNavOpen ? '' : '-translate-x-full'}
				`}
			>
				<div className="flex justify-between align-center">
					<h2 className="text-xl font-bold text-left">Resources</h2>
					<button onClick={() => dispatch(closeMobileNavigation())}>
						X
					</button>
				</div>
				<ul className="mt-4">
					<li className="">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
						>
							Home
						</NavLink>
					</li>
					{/* <li className="my-2">
						<NavLink
							to="/protected"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
						>
							{'Protected'}
						</NavLink>
					</li>
					<li className="my-2">
						<NavLink
							to="/unprotected"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
						>
							{'Unprotected'}
						</NavLink>
					</li>
					{currentUser ? (
						<li className="my-2">
							<NavLink
								to="/logout"
								className={styles.navLink}
								onClick={logoutHandler}
							>
								Logout
							</NavLink>
						</li>
					) : (
						<>
							<li className="my-2">
								<NavLink
									to="/signup"
									className={({ isActive }) =>
										isActive
											? styles.activeNavLink
											: styles.navLink
									}
								>
									Signup
								</NavLink>
							</li>
							<li className="my-2">
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive
											? styles.activeNavLink
											: styles.navLink
									}
								>
									Login
								</NavLink>
							</li>
						</>
					)} */}
					{accordions.map((accordion) => {
						return (
							<Accordion
								text={accordion.text}
								navLink={accordion.link}
								open={accordion.open}
								subsections={accordion.subsections}
							/>
						);
					})}
				</ul>
			</div>
		);
	}

	return (
		<div className="h-full flex flex-col overflow-y-scroll">
			<div className="ml-auto p-2">
				<h2 className="text-xl font-bold ml-auto">Resources</h2>
				<ul>
					<li className="">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
						>
							Home
						</NavLink>
					</li>
					{/* <li className="my-2">
						<NavLink
							to="/protected"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
						>
							{'Protected'}
						</NavLink>
					</li>
					<li className="my-2">
						<NavLink
							to="/unprotected"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
						>
							{'Unprotected'}
						</NavLink>
					</li>
					{currentUser ? (
						<li className="my-2">
							<NavLink
								to="/logout"
								className={styles.navLink}
								onClick={logoutHandler}
							>
								Logout
							</NavLink>
						</li>
					) : (
						<>
							<li className="my-2">
								<NavLink
									to="/signup"
									className={({ isActive }) =>
										isActive
											? styles.activeNavLink
											: styles.navLink
									}
								>
									Signup
								</NavLink>
							</li>
							<li className="my-2">
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive
											? styles.activeNavLink
											: styles.navLink
									}
								>
									Login
								</NavLink>
							</li>
						</>
					)} */}
					{accordions.map((accordion) => {
						return (
							<Accordion
								text={accordion.text}
								navLink={accordion.link}
								open={accordion.open}
								subsections={accordion.subsections}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;

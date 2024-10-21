import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { closeMobileNavigation } from '../../store/navigationSlice';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './css/Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAccordions } from '../../store/sidebarSlice';
import { RootState } from '../../store/store';
import Accordion from '../accordion/Accordion';

function Sidebar({ isMobile = false }) {
	const location = useLocation();
	const mobileNavOpen = useSelector(
		(state: RootState) => state.navigationSlice.mobileNavOpen,
	);
	const dispatch = useDispatch();
	const accordions = useSelector(
		(state: RootState) => state.sidebarSlice.accordions,
	);

	const updateAccordionState = (accordions, path, basePath = '') => {
		// Remove '/learning' from the start of the path if it exists
		const sanitizedPath = path.startsWith('/learning')
			? path.replace('/learning', '')
			: path;

		const segments = sanitizedPath.split('/').filter(Boolean); // split the path and filter out empty strings

		return accordions.map((accordion) => {
			// Build the current path by appending the next segment
			const currentPath = `${basePath}/${segments[0]}`.replace('//', '/');

			// Remove the first segment as it has been used
			const remainingSegments = segments.slice(1);

			// Create a new accordion object instead of modifying the existing one
			const newAccordion = { ...accordion };

			console.log('Path: ', path);
			console.log('Sanitized Path: ', sanitizedPath);
			console.log('CURRENT PATH: ', currentPath);
			console.log('New Accordion Link: ', newAccordion.link);

			if (newAccordion.link === currentPath.substring(1)) {
				newAccordion.open = true;

				// If there are remaining segments and subsections, recurse
				if (newAccordion.subsections && remainingSegments.length > 0) {
					newAccordion.subsections = updateAccordionState(
						newAccordion.subsections,
						remainingSegments.join('/'),
						currentPath, // Pass down the currentPath to the next level
					);
				}
			} else {
				newAccordion.open = false;
			}

			return newAccordion;
		});
	};

	useEffect(() => {
		const updatedAccordions = updateAccordionState(
			accordions,
			location.pathname,
		);

		dispatch(setAccordions(updatedAccordions)); // Assuming you have a state setter for accordions
	}, [location.pathname]);

	if (isMobile) {
		return (
			<div
				className={`
				p-4 h-full flex flex-col overflow-y-scroll 
				absolute bg-gray-100 top-0 z-20 w-1/2 
				transition-transform duration-300 
				dark:bg-gray-800
				${mobileNavOpen ? '' : '-translate-x-full'}
				`}
			>
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-bold">Resources</h2>
					<button
						onClick={() => dispatch(closeMobileNavigation())}
						className="flex items-center justify-center"
					>
						<FontAwesomeIcon
							icon={faTimes}
							className="w-6 h-6 hover:text-blue-400 transition duration-200"
						/>
					</button>
				</div>
				<ul className="mt-4">
					<li className="">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
							onClick={() => dispatch(closeMobileNavigation())}
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
					<div className="flex items-center gap-2">
						<i className="fa-solid fa-gear"></i>
						<NavLink
							to="/settings"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
							onClick={() => dispatch(closeMobileNavigation())}
						>
							Settings
						</NavLink>
					</div>
				</ul>
			</div>
		);
	}

	return (
		<div className="h-full flex overflow-y-scroll border-r border-gray-300">
			<div className="ml-auto p-2 flex flex-col items-start justify-between">
				<div>
					<h2 className="text-xl font-bold">Resources</h2>
					<ul>
						<li className="">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive
										? styles.activeNavLink
										: styles.navLink
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
				<div className="flex items-center gap-2">
					<i className="fa-solid fa-gear"></i>
					<NavLink
						to="/settings"
						className={({ isActive }) =>
							isActive ? styles.activeNavLink : styles.navLink
						}
					>
						Settings
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;

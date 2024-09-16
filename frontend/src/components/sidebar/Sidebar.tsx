import React, { useEffect, useState } from 'react';
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
		const segments = path.split('/').filter(Boolean); // split the path and filter out empty strings

		return accordions.map((accordion) => {
			// Build the current path by appending the next segment
			const currentPath = `${basePath}/${segments[0]}`.replace('//', '/');

			// Remove the first segment as it has been used
			const remainingSegments = segments.slice(1);

			// Create a new accordion object instead of modifying the existing one
			const newAccordion = { ...accordion };

			if (newAccordion.link === currentPath) {
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

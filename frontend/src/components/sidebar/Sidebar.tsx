import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './css/Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/mainApi';
import { unauthenticateUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearLocalStorageUserData } from '../../utils/localStorageUserData';
import { RootState } from '../../store/store';

function Sidebar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [logout] = useLogoutMutation();
	const currentUser = useSelector(
		(state: RootState) => state.auth.currentUser,
	);

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

	return (
		<div className="p-4 h-full flex flex-col bg-orange-300">
			<h2 className="text-xl font-bold text-right">Nav Links</h2>
			<ul className="mt-4 bg-blue-300">
				<li className="my-2">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? styles.activeNavLink : styles.navLink
						}
					>
						Home
					</NavLink>
				</li>
				<li className="my-2">
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
				)}
			</ul>
		</div>
	);
}

export default Sidebar;

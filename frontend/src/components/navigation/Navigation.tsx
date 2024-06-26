import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/mainApi';
import { unauthenticateUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearLocalStorageUserData } from '../../utils/localStorageUserData';
import styles from './css/Navigation.module.css';
import { RootState } from '../../store/store';

const Navigation = () => {
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
		<nav className="m-2">
			<ul className="flex gap-10">
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive ? styles.activeNavLink : styles.navLink
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/protected"
					className={({ isActive }) =>
						isActive ? styles.activeNavLink : styles.navLink
					}
				>
					{'Protected Endpoint (Login Required)'}
				</NavLink>
				<NavLink
					to="/unprotected"
					className={({ isActive }) =>
						isActive ? styles.activeNavLink : styles.navLink
					}
				>
					{'Unprotected Endpoint (Login Not Required)'}
				</NavLink>
				{currentUser ? (
					<NavLink
						to="/logout"
						className={styles.navLink}
						onClick={logoutHandler}
					>
						Logout
					</NavLink>
				) : (
					<>
						<NavLink
							to="/signup"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
						>
							Signup
						</NavLink>
						<NavLink
							to="/login"
							className={({ isActive }) =>
								isActive ? styles.activeNavLink : styles.navLink
							}
						>
							Login
						</NavLink>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;

// React Imports
import { useEffect, useState } from 'react';

// Redux Toolkit Imports
import { useDispatch } from 'react-redux';
import { useRefreshTokenMutation } from '../../store/mainApi';
import { authenticateUser, unauthenticateUser } from '../../store/authSlice';
import {
	setLocalStorageUserData,
	getLocalStorageUserData,
	clearLocalStorageUserData,
} from '../../utils/localStorageUserData';

// Typescript Interfaces Imports
import { RefreshResponse } from '../../types/common.types';
import { AuthProviderProps } from './AuthProvider.types';

// External Library Imports
import Cookies from 'js-cookie';

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const dispatch = useDispatch();
	const [refresh] = useRefreshTokenMutation<RefreshResponse>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			const refreshToken = Cookies.get('isRefreshable');
			const isAuthenticated = Cookies.get('isAuthenticated');
			const userData = getLocalStorageUserData();

			// If the user is authenticated, get the user data from local storage and dispatch to the store
			if (isAuthenticated) {
				dispatch(authenticateUser(userData));
			}

			// If a refresh token is found, check if the user is about to expire
			if (refreshToken) {
				console.log('USER DATA: ', userData);

				const now = Date.now();

				console.log('DIFFERENCE: ', userData?.expirationTime - now);

				// If the user is going to expire in 10 seconds, refresh the tokens
				if (userData?.expirationTime - now < 10000 || !userData) {
					try {
						console.log('REFRESHING');
						const userData = await refresh().unwrap();
						setLocalStorageUserData(userData);
						dispatch(authenticateUser(userData));
					} catch (error) {
						console.error('Failed to refresh token:', error);
					}
				}
			}

			// If no refresh token is found, clear the user data from local storage and dispatch to the store
			else {
				clearLocalStorageUserData();
				dispatch(unauthenticateUser());
			}

			setLoading(false);
		};
		initAuth();
	}, [dispatch, refresh]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

export default AuthProvider;

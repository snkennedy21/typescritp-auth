import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/mainApi';
import { authenticateUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { setLocalStorageUserData } from '../../utils/localStorageUserData';
import FormInput from '../formInput/FormInput';
import Button from '../button/Button';
import { NavLink } from 'react-router-dom';

interface UserData {
	email: string;
	id: string;
	name: string;
}

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login] = useLoginMutation();
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		password: '',
	});

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		});
	};

	const submitFormHandler = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		// Set tokens in cookies and retrieve user data
		const userData: UserData = await login(formState).unwrap();

		// Set user data in redux store
		dispatch(authenticateUser(userData));

		// Set user data in local storage
		setLocalStorageUserData(userData);
		navigate('/');
	};

	return (
		<div className="m-2 flex flex-col items-center justify-center h-[calc(100vh-65px)]">
			<div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm">
				<h1 className="text-xl font-bold mb-4 text-center">Login</h1>
				<form
					onSubmit={submitFormHandler}
					className="flex flex-col gap-4"
				>
					<FormInput
						label="Name"
						name="name"
						type="text"
						onChange={inputChangeHandler}
						value={formState.name}
					/>
					<FormInput
						label="Email"
						name="email"
						type="email"
						onChange={inputChangeHandler}
						value={formState.email}
					/>
					<FormInput
						label="Password"
						name="password"
						type="password"
						onChange={inputChangeHandler}
						value={formState.password}
					/>
					<Button type="submit" variant="primary" className="w-full">
						Login
					</Button>
				</form>
				<p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
					Don't have an account?{' '}
					<NavLink
						to="/signup"
						className="text-blue-500 hover:underline"
					>
						Sign up
					</NavLink>
				</p>
			</div>
		</div>
	);
}

export default Login;

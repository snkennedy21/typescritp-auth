import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/mainApi';
import { authenticateUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { setLocalStorageUserData } from '../../utils/localStorageUserData';
import FormInput from '../formInput/FormInput';
import Button from '../button/Button';

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
		<div className="m-2">
			<h1 className="font-bold mb-4">Login Page</h1>
			<form onSubmit={submitFormHandler}>
				<FormInput
					label="name"
					name="name"
					type="text"
					onChange={inputChangeHandler}
					value={formState.name}
				/>
				<FormInput
					label="email"
					name="email"
					type="text"
					onChange={inputChangeHandler}
					value={formState.email}
				/>
				<FormInput
					label="password"
					name="password"
					type="password"
					onChange={inputChangeHandler}
					value={formState.password}
				/>
				<Button type="submit" variant="primary">
					Login
				</Button>
			</form>
		</div>
	);
}

export default Login;

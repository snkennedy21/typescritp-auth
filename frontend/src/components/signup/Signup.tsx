import React, { useState } from 'react';
import { useSignupMutation } from '../../store/mainApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../store/authSlice';
import FormInput from '../formInput/FormInput';
import Button from '../button/Button';
import { NavLink } from 'react-router-dom';

function Signup() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signup] = useSignupMutation();
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		password: '',
	});

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signup(formState)
			.unwrap()
			.then((response) => {
				const userData = response.data;
				dispatch(authenticateUser(userData));
				navigate('/');
			})
			.catch((error) => {
				console.log('ERROR: ', error);
			});
	};

	return (
		<div className="m-2 flex flex-col items-center justify-center h-[calc(100vh-65px)]">
			<div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm">
				<h1 className="text-xl font-bold mb-4 text-center">Sign Up</h1>
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
						Sign Up
					</Button>
				</form>
				<p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
					Already have an account?{' '}
					<NavLink
						to="/login"
						className="text-blue-500 hover:underline"
					>
						Login
					</NavLink>
				</p>
			</div>
		</div>
	);
}

export default Signup;

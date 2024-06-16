import React from 'react';
import styles from './css/Button.module.css';

const Button = ({
	type = 'button',
	variant = 'primary',
	children,
	onClick = null,
}) => {
	const baseClasses = 'px-4 py-2 rounded focus:outline-none focus:ring-2';
	const variantClasses = {
		primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
		secondary:
			'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300',
		danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
	};

	return (
		<button
			type={type}
			className={`${baseClasses} ${variantClasses[variant]} ${styles.customButton}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;

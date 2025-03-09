import React from 'react';
import { FormInputProps } from './FormInput.types';

const FormInput: React.FC<FormInputProps> = ({
	label,
	name,
	type,
	onChange,
	value,
}) => {
	return (
		<div className="flex flex-col space-y-1">
			<label
				htmlFor={name}
				className="text-sm font-medium text-gray-700 dark:text-gray-300"
			>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				onChange={onChange}
				value={value}
				className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
			/>
		</div>
	);
};

export default FormInput;

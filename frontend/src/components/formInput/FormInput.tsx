import React from 'react';

const FormInput = (props) => {
	return (
		<div className="flex gap-4 items-center mb-3">
			<label>{props.label}</label>
			<input
				className="px-1 border border-gray-300 rounded-sm"
				name={props.name}
				type={props.type}
				onChange={props.onChange}
				value={props.value}
			/>
		</div>
	);
};

export default FormInput;

export interface FormInputProps {
	label: string;
	name: string;
	type: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

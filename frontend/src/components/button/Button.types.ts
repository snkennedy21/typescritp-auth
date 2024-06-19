import { MouseEventHandler, ReactNode } from 'react';

export interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary';
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement> | null;
}

export interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}

export interface User {
	id: number;
	email: string;
	name: string | null;
	password?: string;
	roleId: number | null;
	createdAt: Date;
	updatedAt: Date;
}

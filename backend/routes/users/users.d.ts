export interface CreateUserInput {
  name: string;
  email: string;
  age: number;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  password?: string;
}

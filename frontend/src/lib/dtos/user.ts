import type { Role } from '$lib/models/user';

type CreateUserDTO = {
	name: string;
	email: string;
	password: string;
	role: Role;
};

export type { CreateUserDTO };

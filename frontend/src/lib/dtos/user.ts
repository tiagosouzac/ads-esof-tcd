import type { Role } from '$lib/models/user';

type ListUserDTO = {
	role: Role;
};

type CreateUserDTO = {
	name: string;
	email: string;
	password: string;
	role: Role;
};

export type { ListUserDTO, CreateUserDTO };

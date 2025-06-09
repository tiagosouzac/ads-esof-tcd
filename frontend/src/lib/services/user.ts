import { HttpClient } from '$lib/utils/http-client';
import type { CreateUserDTO, ListUserDTO } from '$lib/dtos/user';
import type { User } from '$lib/models/user';

class UserService {
	static async list(payload?: ListUserDTO) {
		const response = await HttpClient.get<User[]>({ url: '/users', params: payload });
		return response.data;
	}

	static async create(payload: CreateUserDTO) {
		await HttpClient.post({ url: '/users', json: payload });
	}

	static async show() {
		const response = await HttpClient.get<User>({ url: '/users/me' });
		return response.data;
	}
}

export { UserService };

import { HttpClient } from '$lib/utils/http-client';
import type { CreateUserDTO } from '$lib/dtos/user';
import type { User } from '$lib/models/user';

class UserService {
	static async create(payload: CreateUserDTO) {
		await HttpClient.post({ url: '/users', json: payload });
	}

	static async show() {
		const response = await HttpClient.get<User>({ url: '/users/me' });
		return response.data;
	}
}

export { UserService };

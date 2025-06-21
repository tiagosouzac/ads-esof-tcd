import { HttpClient } from '$lib/utils/http-client';
import type { CreateUserDTO, ListUserDTO, UpdateUserDTO } from '$lib/dtos/user';
import type { User } from '$lib/models/user';

class UserService {
	static async list(payload?: ListUserDTO) {
		const response = await HttpClient.get<User[]>({ url: '/users', params: payload });
		return response.data;
	}

	static async create(payload: CreateUserDTO) {
		const response = await HttpClient.post<User>({ url: '/users', json: payload });
		return response.data;
	}

	static async update(id: string, payload: UpdateUserDTO) {
		const response = await HttpClient.put<User>({ url: `/users/${id}`, json: payload });
		return response.data;
	}

	static async delete(id: string) {
		await HttpClient.delete({ url: `/users/${id}` });
	}

	static async find(id: string) {
		const response = await HttpClient.get<User>({ url: `/users/${id}` });
		return response.data;
	}

	static async show() {
		const response = await HttpClient.get<User>({ url: '/users/me' });
		return response.data;
	}

	static async hasManager() {
		try {
			const response = await HttpClient.get<{ exists: boolean }>({ url: '/users/has-manager' });
			return response.data.exists;
		} catch (error) {
			console.error('Error checking if manager exists:', error);
			return false;
		}
	}
}

export { UserService };

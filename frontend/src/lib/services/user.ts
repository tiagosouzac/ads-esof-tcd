import { HttpClient } from '$lib/utils/http-client';
import type { CreateUserDTO, ListUserDTO, UpdateUserDTO } from '$lib/dtos/user';
import type { User } from '$lib/models/user';
import { Role } from '$lib/models/user';

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

	static hasRole(user: User | null | undefined, role: Role | Role[]): boolean {
		if (!user) return false;

		if (Array.isArray(role)) {
			return role.includes(user.role);
		}

		return user.role === role;
	}

	static isManager(user: User | null | undefined): boolean {
		return this.hasRole(user, Role.MANAGER);
	}

	static isArchitect(user: User | null | undefined): boolean {
		return this.hasRole(user, [Role.ARCHITECT, Role.MANAGER]);
	}

	static isDesigner(user: User | null | undefined): boolean {
		return this.hasRole(user, [Role.DESIGNER, Role.MANAGER]);
	}

	static isDeveloper(user: User | null | undefined): boolean {
		return this.hasRole(user, [Role.DEVELOPER, Role.MANAGER]);
	}

	static isQualityAnalyst(user: User | null | undefined): boolean {
		return this.hasRole(user, [Role.QUALITY_ANALYST, Role.MANAGER]);
	}
}

export { UserService };

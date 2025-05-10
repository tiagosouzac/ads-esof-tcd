import { HttpClient } from '$lib/utils/http-client';
import type { SignInDTO } from '$lib/dtos/auth';
import type { User } from '$lib/models/user';

class AuthService {
	static async handle(payload: SignInDTO) {
		const { data } = await HttpClient.post<{
			user: User;
			jwt: { token: string; expiresIn: number };
		}>({ url: '/auth', json: payload });

		return data;
	}
}

export { AuthService };

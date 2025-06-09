import { Role } from '$lib/models/user';
import { HttpError } from '$lib/utils/http-error';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { UserService } from '$lib/services/user';
import { AuthService } from '$lib/services/auth';

export const actions = {
	default: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const name = data.get('name')!.toString().trim();
		const email = data.get('email')!.toString().trim();
		const password = data.get('password')!.toString().trim();

		try {
			await UserService.create({ name, email, password, role: Role.DEVELOPER });
			const { jwt, user } = await AuthService.handle({ email, password });

			cookies.set('auth_token', jwt.token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: import.meta.env.PROD,
				expires: new Date(Date.now() + jwt.expiresIn)
			});

			locals.user = user;

			redirect(303, '/');
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error creating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { name, email },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { name, email },
					errors: {
						form: [
							error.message || 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
						]
					} as Record<string, string[]>
				});
			}

			return fail(500, {
				data: { name, email },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	}
} satisfies Actions;

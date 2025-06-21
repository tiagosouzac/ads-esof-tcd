import { UserService } from '$lib/services/user';
import type { Actions, PageServerLoad } from './$types';
import { fail, isRedirect } from '@sveltejs/kit';
import { Role } from '$lib/models/user';
import type { UpdateUserDTO } from '$lib/dtos/user';
import { HttpError } from '$lib/utils/http-error';

export const load: PageServerLoad = async () => {
	try {
		const users = await UserService.list();
		return { users };
	} catch (error) {
		console.error('Error loading users:', error);
		return { users: [] };
	}
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const role = (formData.get('role')?.toString() as Role) || Role.DEVELOPER;

		try {
			const user = await UserService.create({ name, email, password, role });
			return { user, success: true };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error creating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { name, email, role },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { name, email, role },
					errors: {
						form: [
							error.details ||
								error.message ||
								'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
						]
					} as Record<string, string[]>
				});
			}

			return fail(500, {
				data: { name, email, role },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id')?.toString().trim() ?? '';
		const name = formData.get('name')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const role = (formData.get('role')?.toString() as Role) || Role.DEVELOPER;

		// Update payload (exclude empty password)
		const payload: UpdateUserDTO = { name, email, role };
		if (password) {
			payload.password = password;
		}

		try {
			const user = await UserService.update(id, payload);
			return { user, success: true };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error updating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { id, name, email, role },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { id, name, email, role },
					errors: {
						form: [
							error.details ||
								error.message ||
								'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
						]
					} as Record<string, string[]>
				});
			}

			return fail(500, {
				data: { id, name, email, role },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id')?.toString().trim() ?? '';

		try {
			await UserService.delete(id);
			return { success: true };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error deleting user:', error);

			if (error instanceof HttpError) {
				if (error.status === 409) {
					return fail(409, {
						data: { id },
						errors: {
							form: [
								'Não é possível excluir este usuário porque ele está associado a outros registros.'
							]
						} as Record<string, string[]>
					});
				}

				if (error.status === 422) {
					return fail(422, {
						data: { id },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { id },
					errors: {
						form: [
							error.details ||
								error.message ||
								'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
						]
					} as Record<string, string[]>
				});
			}

			return fail(500, {
				data: { id },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	}
} satisfies Actions;

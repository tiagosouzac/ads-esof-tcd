import { ProjectService } from '$lib/services/project';
import { HttpError } from '$lib/utils/http-error';
import { fail, isRedirect, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { UserService } from '$lib/services/user';
import { Role } from '$lib/models/user';

export const load: PageServerLoad = async () => {
	const architects = await UserService.list({ role: Role.ARCHITECT });
	return { architects };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const description = formData.get('description')?.toString() ?? '';
		const architect = Number(formData.get('architect')?.toString() ?? '');

		try {
			const project = await ProjectService.create({ name, description, architect });
			redirect(303, `/project/${project.id}`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { name, description },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { name, description },
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
				data: { name, description },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	}
} satisfies Actions;

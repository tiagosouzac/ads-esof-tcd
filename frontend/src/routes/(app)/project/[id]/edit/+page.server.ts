import { ProjectService } from '$lib/services/project';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { HttpError } from '$lib/utils/http-error';
import type { Actions, PageServerLoad } from './$types';
import { UserService } from '$lib/services/user';
import { Role } from '$lib/models/user';

export const load: PageServerLoad = async ({ params }) => {
	const project = await ProjectService.find({ id: params.id });
	const architects = await UserService.list({ role: Role.ARCHITECT });
	return { project, architects };
};

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const description = formData.get('description')?.toString() ?? '';
		const architect = Number(formData.get('architect')?.toString() ?? '');

		try {
			const project = await ProjectService.update({ id: params.id, name, description, architect });
			redirect(303, `/project/${project.id}`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { name, description, status },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { name, description, status },
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
				data: { name, description, status },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	}
} satisfies Actions;

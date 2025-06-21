import { ProjectService } from '$lib/services/project';
import { HttpError } from '$lib/utils/http-error';
import { fail, isRedirect, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { UserService } from '$lib/services/user';
import { Role } from '$lib/models/user';

export const load: PageServerLoad = async () => {
	const architects = await UserService.list({ role: Role.ARCHITECT });
	const designers = await UserService.list({ role: Role.DESIGNER });
	const developers = await UserService.list({ role: Role.DEVELOPER });
	const qualityAnalysts = await UserService.list({ role: Role.QUALITY_ANALYST });
	return { architects, designers, developers, qualityAnalysts };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const description = formData.get('description')?.toString() ?? '';
		const architect = Number(formData.get('architect')?.toString() ?? '');
		const designer = Number(formData.get('designer')?.toString() ?? '');
		const developer = Number(formData.get('developer')?.toString() ?? '');
		const qualityAnalyst = Number(formData.get('qualityAnalyst')?.toString() ?? '');

		try {
			const project = await ProjectService.create({
				name,
				description,
				architect,
				designer,
				developer,
				qualityAnalyst
			});
			redirect(303, `/project/${project.id}`);
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { name, description, architect, designer, developer, qualityAnalyst },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { name, description, architect, designer, developer, qualityAnalyst },
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
				data: { name, description, architect, designer, developer, qualityAnalyst },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	}
} satisfies Actions;

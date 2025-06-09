import { ProjectService } from '$lib/services/project';
import { RequirementService } from '$lib/services/requirement';
import { PrototypeService } from '$lib/services/prototype';
import { fail, isRedirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { HttpError } from '$lib/utils/http-error';
import { RequirementStatus } from '$lib/models/requirement';
import type { TaskStatus } from '$lib/models/task';
import { TaskService } from '$lib/services/task';
import { UserService } from '$lib/services/user';

export const load: PageServerLoad = async ({ params }) => {
	const project = await ProjectService.find({ id: params.id });
	const users = await UserService.list();
	return { project, users };
};

export const actions = {
	'create-requirement': async ({ request, params }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const description = formData.get('description')?.toString().trim() ?? '';
		const status = (formData.get('status')?.toString().trim() ?? '') as RequirementStatus;

		try {
			const requirement = await RequirementService.create({
				title,
				description,
				status,
				projectId: params.id
			});

			return { requirement };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { title, description, status },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { title, description, status },
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
				data: { title, description, status },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},
	'update-requirement': async ({ request, params }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const description = formData.get('description')?.toString().trim() ?? '';
		const status = (formData.get('status')?.toString().trim() ?? '') as RequirementStatus;
		const requirementId = formData.get('requirementId')?.toString().trim() ?? '';

		try {
			const requirement = await RequirementService.update({
				id: requirementId,
				title,
				description,
				status,
				projectId: params.id
			});

			return { requirement };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { title, description, status },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { title, description, status },
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
				data: { title, description, status },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},
	'delete-requirement': async ({ request }) => {
		const formData = await request.formData();
		const requirementId = formData.get('requirementId')?.toString().trim() ?? '';

		try {
			await RequirementService.delete({ id: requirementId });
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { requirementId },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { requirementId },
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
				data: { requirementId },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},
	'create-prototype': async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const link = formData.get('link')?.toString().trim() ?? '';

		try {
			const prototype = await PrototypeService.create({
				name,
				link,
				projectId: Number(params.id)
			});

			return { prototype };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error creating prototype:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { link },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { link },
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
				data: { link },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},
	'update-prototype': async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const link = formData.get('link')?.toString().trim() ?? '';
		const prototypeId = formData.get('prototypeId')?.toString().trim() ?? '';

		try {
			const prototype = await PrototypeService.update({
				id: prototypeId,
				name,
				link,
				projectId: Number(params.id)
			});

			return { prototype };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error updating prototype:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { link },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { link },
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
				data: { link },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},
	'delete-prototype': async ({ request }) => {
		const formData = await request.formData();
		const prototypeId = formData.get('prototypeId')?.toString().trim() ?? '';

		try {
			await PrototypeService.delete({ id: prototypeId });
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error deleting prototype:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { prototypeId },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { prototypeId },
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
				data: { prototypeId },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},
	'create-task': async ({ request, params }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const description = formData.get('description')?.toString().trim() ?? '';
		const status = (formData.get('status')?.toString().trim() ?? '') as TaskStatus;
		const assigneeId = formData.get('assigneeId')?.toString().trim() ?? '';

		try {
			const task = await TaskService.create({
				title,
				description,
				status,
				assigneeId: assigneeId ? Number(assigneeId) : null,
				projectId: params.id
			});

			return { task };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { title, description, status, assigneeId },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { title, description, status, assigneeId },
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
				data: { title, description, status, assigneeId },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},
	'update-task': async ({ request, params }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const description = formData.get('description')?.toString().trim() ?? '';
		const status = (formData.get('status')?.toString().trim() ?? '') as TaskStatus;
		const assigneeId = formData.get('assigneeId')?.toString().trim() ?? '';
		const taskId = formData.get('taskId')?.toString().trim() ?? '';

		try {
			const task = await TaskService.update({
				id: taskId,
				title,
				description,
				status,
				assigneeId: assigneeId ? Number(assigneeId) : null,
				projectId: params.id
			});

			return { task };
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { title, description, status, assigneeId },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { title, description, status, assigneeId },
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
				data: { title, description, status, assigneeId },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	},
	'delete-task': async ({ request }) => {
		const formData = await request.formData();
		const taskId = formData.get('taskId')?.toString().trim() ?? '';

		try {
			await TaskService.delete({ id: taskId });
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error authenticating user:', error);

			if (error instanceof HttpError) {
				if (error.status === 422) {
					return fail(422, {
						data: { taskId },
						errors: error.details as Record<string, string[]>
					});
				}

				return fail(error.status, {
					data: { taskId },
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
				data: { taskId },
				errors: {
					form: ['Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']
				} as Record<string, string[]>
			});
		}
	}
} satisfies Actions;

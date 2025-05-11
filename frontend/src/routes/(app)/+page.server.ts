import { ProjectService } from '$lib/services/project';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await ProjectService.list();
	return { projects };
};

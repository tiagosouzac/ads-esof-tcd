import { UserService } from '$lib/services/user';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const hasManager = await UserService.hasManager();

	if (!hasManager) {
		redirect(303, '/sign-up');
	}

	return { hasManager };
};

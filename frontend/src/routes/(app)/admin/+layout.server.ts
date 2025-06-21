import { Role } from '$lib/models/user';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// Check if the user is an admin (MANAGER role)
	if (locals.user?.role !== Role.MANAGER) {
		// Redirect non-admin users to the home page
		redirect(302, '/');
	}

	return {};
};

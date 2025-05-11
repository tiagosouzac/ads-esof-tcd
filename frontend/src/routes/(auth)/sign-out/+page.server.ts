import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	cookies.delete('auth_token', { path: '/' });
	delete locals.user;
	redirect(303, '/sign-in');
};

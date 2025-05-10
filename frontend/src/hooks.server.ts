import { UserService } from '$lib/services/user';
import { HttpClient } from '$lib/utils/http-client';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

export const handle: Handle = async ({ event, resolve }) => {
	await authenticate(event);
	return await resolve(event);
};

async function authenticate(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
	const authToken = event.cookies.get('auth_token');
	const isPublicRoute = PUBLIC_ROUTES.some((route) => event.url.pathname.startsWith(route));

	if (authToken) {
		HttpClient.addGlobalHeaders({ Authorization: `Bearer ${authToken}` });

		try {
			event.locals.user = await UserService.show();
		} catch {
			event.cookies.delete('auth_token', { path: '/' });
			redirect(302, '/sign-in');
		}

		if (isPublicRoute) {
			redirect(302, '/');
		}
	}

	if (!authToken && !isPublicRoute) {
		redirect(302, '/sign-in');
	}
}

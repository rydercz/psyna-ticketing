import secrets from '$lib/server/secrets.ts';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	if (secrets.ticketCheckToken !== event.url.searchParams.get('ticketCheckToken')) {
		throw error(403);
	}
};

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.d.ts';

export const load = (() => {
	throw redirect(308, '/purchase/1');
}) satisfies PageServerLoad;

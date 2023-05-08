import type { PageServerLoad } from './$types.d.ts';

export const load = ((event) => {
    event.url.searchParams.get('vs');
}) satisfies PageServerLoad;

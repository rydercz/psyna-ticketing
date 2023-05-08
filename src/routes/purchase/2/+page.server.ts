import type { PageServerLoad } from './$types.d.ts';

export const load = ((event) => {
    console.log('loaded')
}) satisfies PageServerLoad;

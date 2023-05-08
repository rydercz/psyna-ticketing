import type { Actions, PageServerLoad } from './$types.d.ts';
import { newPurchase } from '$lib/server/spreadsheet.ts';
import { page } from '$app/stores';


export const actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		const vs = await newPurchase({
			jmeno: `${formData.name}`,
			adresa: `${formData.street}\n${formData.zip} ${formData.city}`,
			email: `${formData.email}`
		});

		return {
			vs,
			email: `${formData.email}`
		};
	}
} satisfies Actions;

export const load = ((event) => {
    console.log('loaded')
}) satisfies PageServerLoad;

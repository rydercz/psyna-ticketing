import { generatePaymentQR } from '$lib/utils.ts';
import type { PageServerLoad } from './$types.d.ts';
import secrets from '$lib/server/secrets.ts';
import { fail } from '@sveltejs/kit';

export const load = (async (event) => {
	const vs = parseInt(event.url.searchParams.get('vs') ?? '');
	if (isNaN(vs)) return fail(500);

	const qr = await generatePaymentQR({
		iban: secrets.iban,
		amount: 1, // FIXME
		vs
	});

	return { qr };
}) satisfies PageServerLoad;

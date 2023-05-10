import { generatePaymentQR } from '$lib/utils.ts';
import type { PageServerLoad } from './$types.d.ts';
import secrets from '$lib/server/secrets.ts';
import { fail } from '@sveltejs/kit';
import { getPurchaseByUuid } from '$lib/server/spreadsheet.ts';

export const load = (async (event) => {
	const uuid = event.url.searchParams.get('uuid') ?? '';
	const vs = parseInt(event.url.searchParams.get('vs') ?? '');
	if (isNaN(vs)) return fail(404);

	const purchase = await getPurchaseByUuid(uuid);
	if (!purchase) return fail(404);

	const amount = purchase.cena;
	const qr = await generatePaymentQR({
		iban: secrets.iban,
		amount,
		vs
	});

	return {
		accountNumber: secrets.accountNumber,
		amount,
		qr,
		vs
	};
}) satisfies PageServerLoad;

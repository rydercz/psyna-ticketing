import { generatePaymentQR } from '$lib/utils.ts';
import type { PageServerLoad } from './$types.d.ts';
import secrets from '$lib/server/secrets.ts';
import { redirect, error } from '@sveltejs/kit';
import { getPurchaseByUuid } from '$lib/server/spreadsheet.ts';

export const load = (async (event) => {
	const uuid = event.url.searchParams.get('uuid') ?? '';
	const vs = parseInt(event.url.searchParams.get('vs') ?? '');
	if (isNaN(vs)) throw error(404, "Vstupenka neexistuje.");

	const purchase = await getPurchaseByUuid(uuid);
	if (!purchase) throw error(404, "Vstupenka neexistuje.");

	if (purchase.vstupenky_hash?.length) {
		throw redirect(303, `/ticket/${purchase.vstupenky_hash.join(',')}?uuid=${uuid}`);
	}

	const amount = purchase.cena;
	const qr = await generatePaymentQR({
		iban: secrets.iban,
		amount,
		vs
	});

	return {
		uuid,
		accountNumber: secrets.accountNumber,
		iban: secrets.iban,
		amount,
		amountEur: Math.floor(amount / 24),
		qr,
		vs
	};
}) satisfies PageServerLoad;

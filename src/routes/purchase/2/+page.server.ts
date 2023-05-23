import { generatePaymentQR } from '$lib/utils.ts';
import type { PageServerLoad } from './$types.d.ts';
import secrets from '$lib/server/secrets.ts';
import { fail, redirect } from '@sveltejs/kit';
import { getPurchaseByUuid, matchTransactions } from '$lib/server/spreadsheet.ts';
import { fetchTransactions } from '$lib/server/bank.ts';

export const load = (async (event) => {
	/* TODO MOVE TO A CRON JOB */
  const transactions = await fetchTransactions();
  const newMatches = await matchTransactions(transactions);
	/* END OF TODO */


	const uuid = event.url.searchParams.get('uuid') ?? '';
	const vs = parseInt(event.url.searchParams.get('vs') ?? '');
	if (isNaN(vs)) throw fail(404);

	const purchase = await getPurchaseByUuid(uuid);
	if (!purchase) throw fail(404);

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
		amount,
		qr,
		vs
	};
}) satisfies PageServerLoad;

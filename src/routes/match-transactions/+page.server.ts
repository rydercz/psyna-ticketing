import { fetchTransactions } from '$lib/server/bank.ts';
import secrets from '$lib/server/secrets.ts';
import { matchTransactions } from '$lib/server/spreadsheet.ts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.d.ts';

export const load = (async (event) => {
	if (secrets.cronJobToken !== event.url.searchParams.get('cronJobToken')) {
		throw error(403);
	}

	console.log('start to fetch transaction from bank...');

	const transactions = await fetchTransactions();


	console.log('fetch from bank complete.');

	const newMatches = await matchTransactions(transactions);
	return { matches: [...newMatches] };
}) satisfies PageServerLoad;

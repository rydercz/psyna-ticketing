import { checkTickets } from '$lib/server/spreadsheet.ts';
import { generateTicketQR } from '$lib/utils.ts';
import type { PageServerLoad } from './$types.d.ts';

export const load = (async (event) => {
	const uuid = event.url.searchParams.get('uuid');
	const ticketHashes = await checkTickets(event.params.hash.split(','));

	const tickets = Promise.all(
		ticketHashes.map(async ([hash, validity]) => ({
			hash,
			qr: await generateTicketQR(hash),
			validity
		}))
	);

	return {
		uuid,
		tickets
	};
}) satisfies PageServerLoad;

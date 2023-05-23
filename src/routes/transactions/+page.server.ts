import { fetchTransactions } from "$lib/server/bank.ts";
import { matchTransactions } from "$lib/server/spreadsheet.ts";
import type { PageServerLoad } from "./$types.js";

export const load = (async () => {
  const transactions = await fetchTransactions();
  const newMatches = await matchTransactions(transactions);

  return {
    transactions,
    newMatches
  };
}) satisfies PageServerLoad;

import { useTicket } from '$lib/server/spreadsheet.ts';

export const load = async (event) => {
  const hash = event.params.hash;
  const result = await useTicket(hash);
  return result;
}

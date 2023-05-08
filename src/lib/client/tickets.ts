export interface Ticket {
	name: string;
	email: string;
	uuid: string;
	vs: string;
	hashes: string[];
}

export const getTickets = (): Ticket[] => {
	try {
		return JSON.parse(localStorage.getItem('tickets') ?? '[]');
	} catch (_) {
		localStorage.removeItem('tickets');
    return [];
	}
};

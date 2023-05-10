import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { v4 as uuidv4, validate as isValidUuid } from 'uuid';

import { generateSymbol, mapOpt } from '$lib/utils.ts';
import type { Transaction } from './bank.ts';

import secrets from '$lib/server/secrets.ts';
import { z } from 'zod';

const doc = new GoogleSpreadsheet(secrets.spreadsheetId);
await doc.useServiceAccountAuth(secrets.serviceAccountKey);
await doc.loadInfo();
const purchaseSheet = doc.sheetsByTitle['listky'];
const transactionSheet = doc.sheetsByTitle['neprirazene_transakce'];

export interface UserInfo {
	jmeno: string;
	email: string;
	adresa: string;
}
interface PurchaseEntry extends UserInfo {
	uuid: string;

	vytvoreno: number;
	zaplaceno?: number;
	pouzito?: number;

	cena: number;
	pocet_vstupenek: number;
	variabilni_symbol: number;
	id_transakce?: number;
	vstupenky_hash?: string[];
}
interface TransactionEntry {
	id_transakce: number;
	timestamp: number;
	castka: string;
	variabilni_symbol: number;
	ucet: string;
	jmeno: string;
}

const emptyToUndefined = (x: string): string | undefined => (x === '' ? undefined : x);
const toOptNum = (x: string) => mapOpt(emptyToUndefined(x), (x) => +x);
const toStrArr = (x: string) =>
	x
		.split(',')
		.map((s) => s.trim())
		.filter((s) => s !== '');

const getPurchaseRows = async (): Promise<PurchaseEntry[]> => {
	const rows = await purchaseSheet.getRows();
	return rows.map((r) => ({
		uuid: r['uuid'],

		jmeno: r['jmeno'],
		email: r['email'],
		adresa: r['adresa'],

		vytvoreno: +r['vytvoreno'],
		zaplaceno: toOptNum(r['zaplaceno']),
		pouzito: toOptNum(r['pouzito']),

		cena: +r['cena'],
		pocet_vstupenek: +r['pocet_vstupenek'],
		variabilni_symbol: +r['variabilni_symbol'],
		id_transakce: toOptNum(r['id_transakce']),
		vstupenky_hash: toStrArr(r['vstupenky_hash'])
	}));
};

export const getPurchaseByUuid = async (uuid: string): Promise<PurchaseEntry | undefined> => {
	if (!isValidUuid(uuid)) return undefined;
	const rows = await getPurchaseRows();
	return rows.find(row => row.uuid === uuid);
}

export const generateUuid = async () => {
	const rows = await purchaseSheet.getRows();
	const used = new Set(rows.map((r) => r['uuid']));

	let uuid: string;
	do {
		uuid = uuidv4();
	} while (used.has(uuid));

	return uuid;
};

const addPurchaseRow = (entry: Readonly<PurchaseEntry>) =>
	purchaseSheet.addRow({
		...entry,
		vstupenky_hash: entry.vstupenky_hash?.join(', ') ?? ''
	});

const modifyPurchaseRow = async (
	which: Partial<Readonly<PurchaseEntry>>,
	edit: Partial<Readonly<PurchaseEntry>>
) => {
	const rows = await purchaseSheet.getRows();
	const row = rows.find((r) =>
		Object.entries(which).every(([key, value]) => r[key] === String(value))
	);
	if (row === undefined) throw new Error('Could not find the row');

	for (const [key, value] of Object.entries(edit)) {
		row[key] = value;
	}

	await row.save();
};

const addTransactionRow = (entry: Readonly<TransactionEntry>) => transactionSheet.addRow(entry);

const clearTransactionRows = async () => {
	let rows: GoogleSpreadsheetRow[];
	do {
		rows = await transactionSheet.getRows();
		for (const r of rows.reverse()) await r.delete();
	} while (rows.length > 0);
};

/**
 * @returns the generated unique variable symbol
 * @throws on UUID conflict
 */
export const newPurchase = async (
	uuid: string,
	ticketCount: number,
	user: UserInfo
): Promise<{ vs: number; price: number }> => {
	z.number().int().positive().parse(ticketCount);

	const rows = await getPurchaseRows();
	const usedSymbols = new Set(rows.map((r) => r.variabilni_symbol));

	const rowWithSameUuid = rows.find((row) => row.uuid === uuid);
	if (rowWithSameUuid) {
		console.log(uuid, rowWithSameUuid);
		if (
			user.jmeno === rowWithSameUuid.jmeno &&
			user.adresa === rowWithSameUuid.adresa &&
			user.email === rowWithSameUuid.email
		)
			return {
				vs: rowWithSameUuid.variabilni_symbol,
				price: rowWithSameUuid.cena
			};
		else throw Error(`UUID conflict: ${uuid}`);
	}

	const vs = generateSymbol([user.jmeno, user.email, user.adresa], (s) => !usedSymbols.has(s));
	const price = secrets.ticketPrice * ticketCount;
	await addPurchaseRow({
		uuid,
		...user,
		pocet_vstupenek: ticketCount,
		cena: price,
		vytvoreno: Date.now(),
		variabilni_symbol: vs
	});

	return { vs, price };
};

export const matchTransactions = async (transactions: Transaction[]) => {
	const purchaseRows = await getPurchaseRows();
	const usedSymbols = new Set(purchaseRows.map((r) => r.variabilni_symbol));

	// TODO
};

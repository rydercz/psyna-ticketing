import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { v4 as uuidv4 } from 'uuid';

import { generateSymbol, mapOpt } from '$lib/utils.ts';
import type { Transaction } from './bank.ts';

import secrets from '$lib/server/secrets.json' assert { type: 'json' };

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
	variabilni_symbol: number;
	id_transakce?: number;
	zaplaceno?: number;
	pouzito?: number;
	vstupenka_hash?: string;
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

const getPurchaseRows = async (): Promise<PurchaseEntry[]> => {
	const rows = await purchaseSheet.getRows();
	return rows.map((r) => ({
		uuid: r['uuid'],
		jmeno: r['jmeno'],
		email: r['email'],
		adresa: r['adresa'],
		vytvoreno: +r['vytvoreno'],
		variabilni_symbol: +r['variabilni_symbol'],
		id_transakce: toOptNum(r['id_transakce']),
		zaplaceno: toOptNum(r['zaplaceno']),
		pouzito: toOptNum(r['pouzito']),
		vstupenka_hash: emptyToUndefined(r['vstupenka_hash'])
	}));
};

export const generateUuid = async () => {
	const rows = await purchaseSheet.getRows();
	const used = new Set(rows.map((r) => r['uuid']));

	let uuid: string;
	do {
		uuid = uuidv4();
	} while (used.has(uuid));

	return uuid;
};

const addPurchaseRow = (entry: Readonly<PurchaseEntry>) => purchaseSheet.addRow(entry);

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
export const newPurchase = async (uuid: string, user: UserInfo): Promise<number> => {
	const rows = await getPurchaseRows();
	const usedSymbols = new Set(rows.map((r) => r.variabilni_symbol));

  const rowWithSameUuid = rows.find(row => row.uuid === uuid);
  if (rowWithSameUuid) {
		console.log(uuid, rowWithSameUuid);
    if (
      user.jmeno === rowWithSameUuid.jmeno &&
      user.adresa === rowWithSameUuid.adresa &&
      user.email === rowWithSameUuid.email
    ) return rowWithSameUuid.variabilni_symbol;
    else throw Error(`UUID conflict: ${uuid}`);
  }

	const vs = generateSymbol([user.jmeno, user.email, user.adresa], (s) => !usedSymbols.has(s));
	await addPurchaseRow({ uuid, ...user, vytvoreno: Date.now(), variabilni_symbol: vs });

	return vs;
};

export const matchTransactions = async (transactions: Transaction[]) => {
	const purchaseRows = await getPurchaseRows();
	const usedSymbols = new Set(purchaseRows.map((r) => r.variabilni_symbol));

	// TODO
};

// await newPayment({ jmeno: "Blbal", adresa: "Tupá 21", email: "asdf@fdsa.asdf" })

import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
} from "google-spreadsheet";

import { generateSymbol, mapOpt } from "./utils.ts";
import type { Transaction } from "./bank.ts";

import secrets from "../../secrets.json" assert { type: "json" };

const doc = new GoogleSpreadsheet(secrets.spreadsheetId);
await doc.useServiceAccountAuth(secrets.serviceAccountKey);
await doc.loadInfo();
const purchaseSheet = doc.sheetsByTitle["listky"];
const transactionSheet = doc.sheetsByTitle["neprirazene_transakce"];

export interface UserInfo {
  jmeno: string;
  email: string;
  adresa: string;
}
interface PurchaseEntry extends UserInfo {
  timestamp: number;
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

const emptyToUndefined = (x: string): string | undefined => x === "" ? undefined : x;
const toOptNum = (x: string) => mapOpt(emptyToUndefined(x), x => +x);

const getPurchaseRows = async (): Promise<PurchaseEntry[]> => {
  const rows = await purchaseSheet.getRows();
  return rows.map(r => ({
    jmeno: r['jmeno'],
    email: r['email'],
    adresa: r['adresa'],
    timestamp: +r['timestamp'],
    variabilni_symbol: +r['variabilni_symbol'],
    id_transakce: toOptNum(r['id_transakce']),
    zaplaceno: toOptNum(r['zaplaceno']),
    pouzito: toOptNum(r['pouzito']),
    vstupenka_hash: emptyToUndefined(r['vstupenka_hash']),
  }));
};

const getUsedVariableSymbols = async () => {
  const rows = await purchaseSheet.getRows();
  return new Set(rows.map((r) => +r["variabilni_symbol"]));
};

const addPurchaseRow = (entry: Readonly<PurchaseEntry>) =>
  purchaseSheet.addRow(entry);

const modifyPurchaseRow = async (
  which: Partial<Readonly<PurchaseEntry>>,
  edit: Partial<Readonly<PurchaseEntry>>
) => {
  const rows = await purchaseSheet.getRows();
  const row = rows.find((r) =>
    Object.entries(which).every(([key, value]) => r[key] === String(value))
  );
  if (row === undefined) throw new Error("Could not find the row");

  for (const [key, value] of Object.entries(edit)) {
    row[key] = value;
  }

  await row.save();
};

const addTransactionRow = (entry: Readonly<TransactionEntry>) =>
  transactionSheet.addRow(entry);

const clearTransactionRows = async () => {
  let rows: GoogleSpreadsheetRow[];
  do {
    rows = await transactionSheet.getRows();
    for (const r of rows.reverse()) await r.delete();
  } while (rows.length > 0);
};

/** @returns the generated unique variable symbol */
export const newPayment = async (user: UserInfo): Promise<number> => {
  const usedSymbols = await getUsedVariableSymbols();
  const vs = generateSymbol(
    [user.jmeno, user.email, user.adresa],
    (s) => !usedSymbols.has(s)
  );
  await addPurchaseRow({ ...user, timestamp: Date.now(), variabilni_symbol: vs });

  return vs;
};

export const matchTransactions = async (transactions: Transaction[]) => {
  await getUsedVariableSymbols();

}

// await newPayment({ jmeno: "Blbal", adresa: "Tupá 21", email: "asdf@fdsa.asdf" })

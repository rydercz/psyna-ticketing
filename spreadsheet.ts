// @deno-types="npm:@types/google-spreadsheet@3.3.1"
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
} from "npm:google-spreadsheet@3.3.0";
import { format } from "https://deno.land/std@0.182.0/datetime/mod.ts";

import secrets from "./secrets.json" assert { type: "json" };
import { delay, mapOpt } from "./utils.ts";

const doc = new GoogleSpreadsheet(secrets.spreadsheetId);
await doc.useServiceAccountAuth(secrets.serviceAccountKey);
await doc.loadInfo();
const purchasesSheet = doc.sheetsByTitle["listky"];
const transactionsSheet = doc.sheetsByTitle["neprirazene_transakce"];

export interface UserInfo {
  jmeno: string;
  email: string;
  adresa: string;
}
interface PurchaseEntry extends UserInfo {
  datum: number;
  variabilni_symbol: number;
  id_transakce?: number;
  zaplaceno?: number;
  pouzito?: number;
  vstupenka_hash?: string;
}
interface TransactionEntry {
  id_transakce: number;
  datum: number;
  castka: string;
  variabilni_symbol: number;
  ucet: string;
  jmeno: string;
}

const addPurchaseRow = (entry: Readonly<PurchaseEntry>) =>
  purchasesSheet.addRow(entry);

const modifyPurchaseRow = async (
  which: Partial<Readonly<PurchaseEntry>>,
  edit: Partial<Readonly<PurchaseEntry>>
) => {
  const rows = await purchasesSheet.getRows();
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
  transactionsSheet.addRow(entry);

const clearTransactionRows = async () => {
  let rows: GoogleSpreadsheetRow[];
  do {
    rows = await transactionsSheet.getRows();
    for (const r of rows) await r.delete();
  } while (rows.length > 0);
};

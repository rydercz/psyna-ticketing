// @deno-types="npm:@types/google-spreadsheet@3.3.1"
import { GoogleSpreadsheet } from "npm:google-spreadsheet@3.3.0";
import secrets from "./secrets.json" assert { type: "json" };

const doc = new GoogleSpreadsheet(secrets.spreadsheetId);
await doc.useServiceAccountAuth(secrets.serviceAccountKey);
await doc.loadInfo();
const sheet = doc.sheetsByIndex[0];

interface FullEntry {
  datum: number;
  jmeno: string;
  email: string;
  variabilni_symbol: number;
  zaplaceno: boolean;
  adresa: string;
}
const addRow = (entry: Readonly<FullEntry>) => sheet.addRow(entry);

await addRow({
  datum: Date.now(),
  jmeno: "Jan Grňo",
  email: "jan@grno.cz",
  adresa: "U Tvoji Mamy 69",
  variabilni_symbol: 1234,
  zaplaceno: false,
});

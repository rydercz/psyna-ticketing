// @deno-types="npm:@types/google-spreadsheet@3.3.1"
import { GoogleSpreadsheet } from "npm:google-spreadsheet@3.3.0";
import secrets from "./secrets.json" assert { type: "json" };

const doc = new GoogleSpreadsheet(secrets.spreadsheetId);
await doc.useServiceAccountAuth(secrets.serviceAccountKey);
await doc.loadInfo();

const sheet = doc.sheetsByIndex[0];
sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' });



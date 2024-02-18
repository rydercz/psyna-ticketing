import { createTransport } from 'nodemailer';
import secrets from '$lib/server/secrets.ts';
import { generateTicketQR } from '$lib/utils.ts';
import type { Attachment } from 'nodemailer/lib/mailer/';

export async function sendTicket(name: string, address: string, uuid: string, hashes: string[]) {
	const qrCodes = await Promise.all(hashes.map(generateTicketQR));
	const cids = hashes.map(
		(hash) => `${hash.replace('-', '')}${Math.floor(10_000 * Math.random())}@vstupenky.psyna.cz`
	);

	const instructions = `U vstupu na akci se prokážete přiloženým QR kódem, který lze použít pouze jednou.

Psyna se koná 12.-14.7.2024 na louce u Jeníkovic jako vždy. 
GPS: 50.223569, 15.984357

Za devatero krtinci, za několika kravinci, Na známé louce mezí kvítí,
scházejí se všici odpočatí.
Ve vlnách trávy, kde echo náš smích nese,
Kde blízko k vodě, blízko v lese, Nezapomeň na dva páry gatí, nic tě po tom nepřekvapí.

V případě jakýchkoliv nejasností, technických problémů, nebo reklamace, použijte kontaktní email vstupenky@psyna.cz

Těšíme se na vás 12. července.
Vaše Psyna crew.`;

	const text =
		'Děkujeme za zakoupení vstupenky!' +
		hashes.map((hash, i) => `\n\nVstupenka č. ${i + 1}: ${hash}`).join('') +
		'\n\n' +
		instructions;

	const html =
		'<h2>Děkujeme za zakoupení vstupenky!</h2>' +
		hashes
			.map(
				(hash, i) => `
          <h3>Vstupenka č. ${i + 1}</h3>
          <p>Kód: <a href="https://vstupenky.psyna.cz/ticket/${hash}?uuid=${uuid}">${hash}</a></p>
          <img alt="${hash}" src="cid:${cids[i]}">
        `
			)
			.join('') +
		'<br/><br/>' +
		instructions.replaceAll('\n', '<br/>');

	const transporter = createTransport({
		...secrets.mail
	});
	await transporter.sendMail({
		from: {
			name: 'Vstupenky psyna',
			address: secrets.mail.address
		},
		to: { name, address },
		subject: 'Vstupenka na Psynu 2024',
		text,
		html,
		attachments: qrCodes.map(
			(qr, i): Attachment => ({
				path: qr,
				cid: cids[i]
			})
		)
	});
}

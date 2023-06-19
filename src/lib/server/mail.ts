import { createTransport } from 'nodemailer';
import secrets from '$lib/server/secrets.ts';
import { generateTicketQR } from '$lib/utils.ts';
import type { Attachment } from 'nodemailer/lib/mailer/';

export async function sendTicket(name: string, address: string, hashes: string[]) {
	const qrCodes = await Promise.all(hashes.map(generateTicketQR));
	const cids = hashes.map(
		(hash) => `${hash.replace('-', '')}${Math.floor(10_000 * Math.random())}@artyparty.csha.io`
	);

	const text =
		'Děkujeme za zakoupení vstupenky!' +
		hashes.map((hash, i) => `\n\nVstupenka č. ${i + 1}: ${hash}`).join('');

	const html =
		'<h2>Děkujeme za zakoupení vstupenky!</h2>' +
		hashes
			.map(
				(hash, i) => `
          <h3>Vstupenka č. ${i + 1}</h3>
          <p>Kód: <a href="https://artyparty.csha.io/ticket/${hash}">${hash}</a></p>
          <img alt="${hash}" src="cid:${cids[i]}">
        `
			)
			.join('');

	const transporter = createTransport({
		...secrets.mail
	});
	await transporter.sendMail({
		from: {
			name: 'Artyparty Bot',
			address: secrets.mail.address
		},
		to: { name, address },
		subject: 'Vstupenka na Artyparty',
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

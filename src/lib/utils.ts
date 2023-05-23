import { toDataURL } from 'qrcode';
import hashJs from 'hash.js';
const { sha256 } = hashJs;

export const mapOpt = <S, T>(x: S | undefined, f: (x: S) => T | undefined): T | undefined =>
	x === undefined ? undefined : f(x);

export const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

export const generateSymbol = (
	seeds: Array<string | number>,
	isValid: (hash: number) => boolean = () => true
) => {
	const crypt = sha256();
	let hash: number;

	do {
		seeds.forEach((s) => crypt.update(String(s)));
		hash = Number(BigInt('0x' + crypt.digest('hex')) % 1_00_00_00n);
	} while (!isValid(hash));

	return hash;
};

export const pickRandomItem = <T>(arr: T[]): T => {
	if (arr.length === 0) throw new TypeError('Cannot pick item from empty array');
	return arr[Math.floor(Math.random() * arr.length)];
}

export const parseIban = (iban: string): string => {
	iban = iban.replaceAll(/\s+/g, '').toUpperCase();

	const head = iban.slice(0, 4);
	const tail = iban.slice(4);

	let str = `${tail}${head}`;
	for (let i = 0; i < 26; i++) {
		// A → 10, B → 11, ... Z → 35
		str = str.replaceAll(String.fromCharCode('A'.charCodeAt(0) + i), String(10 + i));
	}
	const remainder = BigInt(str) % 97n;

	if (remainder !== 1n) throw TypeError('Invalid IBAN');
	return iban;
};

export const generatePaymentQR = ({
	iban,
	amount,
	vs
}: {
	iban: string;
	amount: number;
	vs: number;
}) => {
	iban = parseIban(iban);
	const str = `SPD*1.0*ACC:${iban}*AM:${amount.toFixed(2)}*CC:CZK*PT:IP*X-VS:${vs}`;
	return toDataURL(str);
};

export const setMinus = <T>(a: Set<T>, b: Set<T>): Set<T> =>
	new Set([...a].filter((_) => !b.has(_)));

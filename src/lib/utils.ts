import hashJs from "hash.js";
const { sha256 } = hashJs;

export const mapOpt = <S, T>(
  x: S | undefined,
  f: (x: S) => T | undefined
): T | undefined => (x === undefined ? undefined : f(x));

export const delay = (ms: number) =>
  new Promise<void>((res) => setTimeout(res, ms));

export const generateSymbol = (
  seeds: Array<string | number>,
  isValid: (hash: number) => boolean = () => true
) => {
  const crypt = sha256();
  let hash: number;

  do {
    seeds.forEach((s) => crypt.update(String(s)));
    hash = Number(BigInt("0x" + crypt.digest("hex")) % 10_000_000_000n);
  } while (!isValid(hash));

  return hash;
};

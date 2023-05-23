import { pickRandomItem } from "./utils.ts";

enum Rod {
	Muzsky = 0,
	Stredni = 1,
	Zensky = 2
}

type Adjektivum = string | [muzsky: string, stredni: string, zensky: string];
type Substantivum = [string, Rod];

const adjektiva: Adjektivum[] = [
  "absurdni",
  ["antifasisticky", "antifasisticke", "antifasisticka"],
  ["anarchisticky", "anarchisticke", "anarchisticka"],
  ["bajecny", "bajecne", "bajecna"],
  ["bezelstny", "bezelstne", "bezelstna"],
  ["bojovny", "bojovne", "bojovna"],
  "binarni",
  ["chapavy", "chapave", "chapava"],
  ["ctyrvalcovy", "ctyrvalcove", "ctyrvalcova"],
  ["dadaisticky", "dadaisticke", "dadaisticka"],
  "dekadentni",
  "divergentni",
  ["divotvorny", "divotvorne", "divotvorna"],
  "ekvipotencialni",
  "emotivni",
  "exportni",
  "famozni",
  ["fialovy", "fialove", "fialova"],
  ["ferovy", "ferove", "ferova"],
  ["feministicky", "feministicke", "feministicka"],
  ["hydraulicky", "hydraulicke", "hydraulicka"],
  "investigativní",
  "interstelarni",
  ["jehlicnaty", "jehlicnate", "jehlicnata"],
  "kapesni",
  ["modrovlasy", "modrovlase", "modrovlasa"],
  "nevokalni",
  "spektralni",
  ["senzomotoricky", "senzomotoricke", "senzomotoricka"],
  ["vychytraly", "vychytrale", "vychytrala"],
];

const substantiva: Substantivum[] = [
  ["alpaka", Rod.Zensky],
  ["jezura", Rod.Zensky],
  ["kapybara", Rod.Zensky],
  ["kakadu", Rod.Muzsky],
  ["kote", Rod.Stredni],
  ["lemur", Rod.Muzsky],
  ["luskoun", Rod.Muzsky],
  ["myval", Rod.Muzsky],
  ["okapi", Rod.Zensky],
  ["plamenak", Rod.Muzsky],
  ["ptakopysk", Rod.Muzsky],
  ["rak", Rod.Muzsky],
  ["rypous", Rod.Muzsky],
  ["sele", Rod.Stredni],
  ["surikata", Rod.Zensky],
  ["svinka", Rod.Zensky],
  ["tapir", Rod.Muzsky],
  ["vacice", Rod.Zensky],
  ["vombat", Rod.Muzsky],
];

export const generujJmeno = (validni = (jmeno: string) => true): string => {
  const adj = pickRandomItem(adjektiva);
  const subs = pickRandomItem(substantiva);
  const rod = subs[1];

  const adjTvar = Array.isArray(adj) ? adj[rod] : adj;

  const jmeno = `${adjTvar}-${subs[0]}`;
  if (validni(jmeno)) return jmeno;
  
  return generujJmeno(validni);
}

export const generujNJmen = (n: number, validni = (jmeno: string) => true): string[] => {
  const jmena: string[] = [];
  for (let i = 0; i < n; i++) {
    jmena.push(generujJmeno(j => validni(j) && !jmena.includes(j)))
  }
  return jmena;
}

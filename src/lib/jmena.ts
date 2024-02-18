import { pickRandomItem } from './utils.ts';

enum Rod {
	Muzsky = 0,
	Stredni = 1,
	Zensky = 2
}

type Adjektivum = string | [muzsky: string, stredni: string, zensky: string];
type Substantivum = [string, Rod];

const adjektiva: Adjektivum[] = [
	'absurdni',
	['antifasisticky', 'antifasisticke', 'antifasisticka'],
	['anarchisticky', 'anarchisticke', 'anarchisticka'],
	['bajecny', 'bajecne', 'bajecna'],
	['bezelstny', 'bezelstne', 'bezelstna'],
	['bojovny', 'bojovne', 'bojovna'],
	'binarni',
	['chapavy', 'chapave', 'chapava'],
	['ctyrvalcovy', 'ctyrvalcove', 'ctyrvalcova'],
	['dadaisticky', 'dadaisticke', 'dadaisticka'],
	'dekadentni',
	'divergentni',
	['divotvorny', 'divotvorne', 'divotvorna'],
	'ekvipotencialni',
	'emotivni',
	'exportni',
	'famozni',
	['fialovy', 'fialove', 'fialova'],
	['ferovy', 'ferove', 'ferova'],
	['feministicky', 'feministicke', 'feministicka'],
	['hydraulicky', 'hydraulicke', 'hydraulicka'],
	'investigativni',
	'interstelarni',
	['jehlicnaty', 'jehlicnate', 'jehlicnata'],
	'kapesni',
	['modrovlasy', 'modrovlase', 'modrovlasa'],
	'nevokalni',
	'neurodivergentnti',
	'spektralni',
	['senzomotoricky', 'senzomotoricke', 'senzomotoricka'],
	['troufaly', 'troufale', 'troufala'],
	['vychytraly', 'vychytrale', 'vychytrala']
];

const substantiva: Substantivum[] = [
	['agama', Rod.Zensky],
	['alpaka', Rod.Zensky],
	['anomalocaris', Rod.Muzsky],
	['bodlin', Rod.Muzsky],
	['jezura', Rod.Zensky],
	['kapybara', Rod.Zensky],
	['kakadu', Rod.Muzsky],
	['kosatka', Rod.Zensky],
	['kote', Rod.Stredni],
	['krakatice', Rod.Zensky],
	['lemur', Rod.Muzsky],
	['lenochod', Rod.Muzsky],
	['lodenka', Rod.Zensky],
	['luskoun', Rod.Muzsky],
	['mlok', Rod.Muzsky],
	['myval', Rod.Muzsky],
	['nosatec', Rod.Muzsky],
	['okapi', Rod.Zensky],
	['oknozubka', Rod.Zensky],
	['plamenak', Rod.Muzsky],
	['ptakopysk', Rod.Muzsky],
	['rak', Rod.Muzsky],
	['rypous', Rod.Muzsky],
	['sakal', Rod.Muzsky],
	['sele', Rod.Stredni],
	['stegosaurus', Rod.Muzsky],
	['surikata', Rod.Zensky],
	['svinka', Rod.Zensky],
	['tapir', Rod.Muzsky],
	['tarbik', Rod.Muzsky],
	['vacice', Rod.Zensky],
	['vakovlk', Rod.Muzsky],
	['vombat', Rod.Muzsky],
	['zirafa', Rod.Zensky]
];

// Array of adjectives for generating stoner band names
const adjectives = [
	"Dark", "Mysterious", "Psychedelic", "Lost", "Heavy",
	"Ominous", "Crystal", "Desolate", "Cosmic", "Ancient",
	"Eternal", "Fire", "Icy", "Stony", "Forgotten",
	"Mystic", "Wild", "Noble", "Enigmatic", "Solid",
	"Bloody", "Golden", "Magical", "Quiet", "Stormy",
	"Torn", "Brave", "Shadowy", "Flaming", "Abyssal",
	"Summit", "Green", "Dragon", "Iron", "Ghostly",
	"Energetic", "Furious", "Buried", "Glowing", "Icy"
];

// Array of singular nouns for generating stoner band names
const nouns = [
	"Wolf", "Pilgrim", "Druid", "Phantom", "Horizon",
	"Cosmos", "Echo", "Realm", "Vortex", "Titan",
	"Scientist", "Flame", "King", "Mage", "Fairy",
	"Demon", "Wind", "Rock", "Ocean", "Darkness",
	"Beast", "Ghost", "Star", "Planet", "Knight",
	"Garden", "Mountain", "River", "Forest", "Cave",
	"Portal", "World", "Veil", "Castle", "Throne",
	"Dream", "Sphere", "Path", "Story", "Legend"
];


export const generujJmeno = (validni = (jmeno: string) => true, volne = false): string => {

	const first = pickRandomItem(adjectives);
	const second = pickRandomItem(adjectives);
	const noun = pickRandomItem(nouns);

	let prefix = '';
	if (volne) prefix = 'free-';

	const jmeno = `${prefix}${first}-${second}-${noun}`;
	if (validni(jmeno)) return jmeno;

	return generujJmeno(validni);
};

export const generujNJmen = (
	n: number,
	validni = (jmeno: string) => true,
	volne = false
): string[] => {
	const jmena: string[] = [];
	for (let i = 0; i < n; i++) {
		jmena.push(generujJmeno((j) => validni(j) && !jmena.includes(j), volne));
	}
	return jmena;
};

// Vérifie, avant de lancer une campagne, ce que Meta autorise au pixel sur
// chaque domaine : la configuration que fbevents.js télécharge liste les
// événements restreints (catégorie sensible, ex. santé) et les modules chargés.
//
//   npm run check:meta -- decouverte.twentyonepilates.fr www.twentyonepilates.fr
//
// Pixel : PUBLIC_PIXEL_ID (.env) ou --pixel=<id>. À lancer après la mise en
// ligne : Meta ne classe un domaine qu'une fois la page visitée.
// Code de sortie 1 si un événement de la page est restreint ou si la détection
// automatique d'événements est active.

// Événements que la page et /thank-you envoient (voir CLAUDE.md, Tracking).
const OUR_EVENTS = ['PageView', 'Contact', 'InitiateCheckout', 'Schedule'];

const args = process.argv.slice(2);
const pixel = (args.find((a) => a.startsWith('--pixel=')) || '').slice(8) || process.env.PUBLIC_PIXEL_ID;
const domains = args.filter((a) => !a.startsWith('--'));

if (!pixel || !/^\d+$/.test(pixel) || domains.length === 0) {
  console.error('Usage : npm run check:meta -- <domaine> [<domaine>…] [--pixel=<id>]');
  console.error('Pixel lu dans PUBLIC_PIXEL_ID (.env) à défaut de --pixel.');
  process.exit(2);
}

function configSet(source, name) {
  const match = source.match(new RegExp(`config\\.set\\("${pixel}", "${name}", (\\{.*?\\})\\);`));
  try { return match ? JSON.parse(match[1]) : null; } catch { return null; }
}

let problems = 0;
console.log(`Pixel ${pixel}\n`);

for (const domain of domains) {
  const url = `https://connect.facebook.net/signals/config/${pixel}?v=2.9.419&r=stable&domain=${encodeURIComponent(domain)}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`✗ ${domain} : configuration introuvable (HTTP ${response.status})\n`);
    problems++;
    continue;
  }
  const source = await response.text();
  const validation = configSet(source, 'eventValidation') || {};
  const restricted = validation.restrictedEventNames || [];
  const unverified = validation.unverifiedEventNames || [];
  const blocked = OUR_EVENTS.filter((e) => restricted.includes(e) || unverified.includes(e));
  // Module de « Inclure automatiquement des informations plus détaillées sur
  // les pages et les produits » : il envoie son propre InitiateCheckout, sans eventID.
  const smartSetup = source.includes('loadPlugin("smartsetup")');

  console.log(`${blocked.length || smartSetup ? '✗' : '✓'} ${domain}`);
  console.log(`  Événements restreints : ${restricted.length ? restricted.join(', ') : 'aucun'}`);
  if (unverified.length) console.log(`  Événements non vérifiés : ${unverified.join(', ')}`);
  if (blocked.length) console.log(`  → bloqués parmi ceux de la page : ${blocked.join(', ')}. Ne pas contourner.`);
  console.log(`  Détection automatique d'événements : ${smartSetup ? 'ACTIVE → la désactiver (doublons sans eventID)' : 'inactive'}`);
  console.log('');
  if (blocked.length || smartSetup) problems++;
}

process.exit(problems ? 1 : 0);

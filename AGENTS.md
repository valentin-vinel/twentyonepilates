# LP campagne — Twenty One Pilates

Landing page d'une campagne Meta Ads pour le studio Twenty One Pilates, à Dijon.
Offre : séance découverte de reformer, réservée et payée en ligne sur Momence,
réservée à une première visite, valable 15 jours après le paiement.
Prix et détails : src/config/studio.ts, seule source à jour.
Objectif unique : amener la personne sur la réservation Momence de la séance
découverte.

Ce n'est pas un template. Une page, un client, une campagne.

Ce fichier remplace, pour ce projet, le CLAUDE.md du dossier parent, qui
décrit la campagne nü form (formulaire de rappel, aucun lien sortant). En cas
de contradiction, celui-ci fait foi.

## Stack
- Astro statique, CSS natif avec variables, zéro framework UI.
- Hébergement Vercel (netlify.toml, hérité, y est ignoré). Aucune fonction,
  aucun formulaire.
- Budget : moins de 20 ko de JavaScript.

## Contenu
- Tutoiement partout : page, bandeau cookies, politique de confidentialité.
  Les avis clients sont cités tels quels.
- Tout ce qui est propre au studio vit dans src/config/studio.ts : textes,
  prix, téléphone, lien Momence, photos, avis, FAQ. Aucun composant n'en contient.
- Les valeurs entre crochets « [ … ] » sont des placeholders : affichées telles
  quelles, listées dans la console à chaque build. Aucune ne part en ligne.
- Une liste vide masque l'élément correspondant (section, bandeau, ligne).
- Photos dans src/assets/studio/. Tant qu'une photo manque, un aplat affiche ce
  qu'elle doit montrer.

## Design
- Tokens dans src/config/brand.ts, aucune couleur ni police en dur ailleurs.
  Landing.astro génère une variable CSS par token (bgAlt → --c-bg-alt).
- Les maquettes de ./design/ sont celles de nü form : elles ne font pas
  autorité pour ce studio.
- Couleurs :
  - boutons et tout texte sur fond coloré : ink sur bg, ou deepInk sur deep.
    Boutons de la séance découverte et du bloc final : ink sur surface,
    contour ink, relief pinkSoft ;
  - pink, pinkSoft, roseLight, lavande : aplats décoratifs, bordures et puces,
    jamais en fond sous du texte ;
  - seul texte en rose : le mot mis en avant d'un titre (`*mot*`, un par
    titre) et la signature du logo, via --accent-word : pinkSoft (#FFB7CE,
    rose du site du studio) sur fond sombre et sur la photo du hero mobile,
    rose foncé (pink mêlé à 30 % d'ink) sur fond clair. Jamais pink ni
    pinkSoft purs sur fond clair (1,4 à 2,2:1) ;
  - contrastes WCAG : texte ≥ 4,5:1, contours d'éléments d'interface ≥ 3:1.
    muted ne va jamais sur deep (2,05:1) : utiliser --muted, ajusté au fond.
- Typographie : Montserrat seule, variable, servie en local depuis
  public/fonts/. Hiérarchie par graisse et par taille, pas d'italique.
- Fonds de section alternés bg → bgAlt → deep, comptés sur les sections
  affichées. Le bloc final est deep ; la section qui le précède n'est jamais deep.

## Conversion
- CTA unique : lien direct vers la réservation de la séance découverte sur
  Momence (studio.cta.url), dans le même onglet. Même libellé et même lien
  partout. C'est le seul lien sortant de la page.
- Sous chaque bouton : une phrase factuelle sur ce qui attend la personne sur
  Momence (studio.cta.note), puis le numéro du studio en secondaire (lien tel:
  réel), jamais mis en avant. Pas de numéro sous le bouton de la séance
  découverte.
- Bouton dans le hero (sous le prix), après les étapes de la séance découverte,
  et dans le bloc final.
- Barre fixe en bas sur mobile et bulle sur ordinateur, masquées tant que le
  hero est à l'écran, puis présentes en continu jusqu'au bloc final, où elles
  se masquent (il a son propre bouton).
- Aucun formulaire, aucun menu. Pas de grille d'abonnements.
- Le prix et le bouton sont dans le hero : la personne vient pour un prix.
  Le bloc séance découverte suit avec le récapitulatif et les étapes.

## Tracking
- Pixel chargé après consentement uniquement. Bandeau CNIL, refuser aussi
  visible qu'accepter.
- Clic sur un lien tel: → événement Contact ; clic vers la réservation Momence
  → événement InitiateCheckout. Chacun une seule fois par session, avec un
  eventID unique conservé en sessionStorage.
- Un clic n'est pas un appel décroché, un clic vers Momence n'est pas une séance
  réservée. Ne jamais les appeler conversion. Les réservations se comptent dans
  Momence, et ne remontent dans Meta que par le pixel configuré côté Momence.
- fbclid et UTM capturés à l'arrivée en sessionStorage.
- Au clic de réservation, les UTM sont ajoutés au lien Momence ; fbclid
  seulement après consentement.
- Aucune donnée personnelle collectée ni transmise par la page.

## Honnêteté
- Aucun avis inventé, aucun faux compte à rebours.
- La date de fin de l'offre est réelle ou absente.
- Aucune promesse de résultat physique.
- Les faits affichés (prix, durée, places, conditions) sont vérifiés auprès du
  studio ou sur Momence, jamais reconstitués de mémoire.

## Performance
LCP sous 2,5 s en 4G, CLS à 0. Images via astro:assets, hero en eager,
le reste en lazy. Police en local, woff2, préchargée.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

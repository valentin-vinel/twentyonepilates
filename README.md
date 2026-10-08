# Landing page séance découverte

Landing page de campagne Meta Ads : séance découverte à prix d'appel. Le
bouton unique mène à la réservation de la séance sur Momence (lien externe) ;
le numéro du studio reste proposé en secondaire.

```sh
npm install
npm run dev       # ou : astro dev --background
npm run build     # site statique dans dist/
```

Textes, prix, téléphone et lien de réservation : `src/config/studio.ts`.
Couleurs et polices : `src/config/brand.ts`. Le build liste dans la console
les valeurs encore entre crochets.

## Réservation

Le lien Momence (`studio.cta.url`) est celui de la séance découverte, pas la
page d'accueil du planning. La page ne recueille aucune donnée personnelle :
réservation et paiement se font sur Momence.

Au clic, les `utm_*` de l'arrivée sont ajoutés au lien Momence (et `fbclid`
après consentement), voir `CtaButton.astro`.

## Tracking

Pixel Meta après consentement uniquement (`PUBLIC_PIXEL_ID`, voir `.env.example`).
Événements, une fois par session chacun : `Contact` au clic sur le numéro,
`InitiateCheckout` au clic vers la réservation Momence. Un clic n'est pas une
séance réservée : les réservations se comptent dans Momence.

Paramètres d'URL à renseigner sur chaque annonce Meta (niveau annonce) :

```
utm_source={{site_source_name}}&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

Ils sont transmis à Momence avec le clic de réservation, consentement ou non :
c'est ce qui peut dire quelle annonce amène des réservations. Nommer les annonces de
façon lisible, c'est ce nom qui apparaît dans `utm_content`.

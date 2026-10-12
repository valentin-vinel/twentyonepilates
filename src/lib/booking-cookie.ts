/**
 * Retour de réservation. Momence renvoie chaque réservation de créneau du
 * studio (pas les achats), campagne ou non, vers la page de confirmation de
 * son site (/thank-you). Au clic vers Momence, et seulement après
 * consentement, la page pose ce cookie
 * sur le domaine racine, partagé avec ce site : la page de confirmation y lit
 * que la personne vient de la campagne, envoie Schedule une fois avec cet
 * eventID, puis l'efface. Les autres réservations ne déclenchent rien.
 * Code de la page de confirmation : site-studio/thank-you.snippet.html.
 *
 * Schedule est un créneau réservé, pas une séance payée : seul Momence le sait.
 */
export const BOOKING_COOKIE = 't21_lp_booking';

/**
 * La séance se paie d'abord, puis le créneau se réserve dans les 15 jours. La
 * première confirmation affichée après le clic compte et efface le cookie.
 */
export const BOOKING_COOKIE_MAX_AGE = 15 * 24 * 60 * 60;

/** 'decouverte.twentyonepilates.fr' → '.twentyonepilates.fr'. Refusé par le navigateur en local et sur *.vercel.app. */
export function rootDomain(): string {
  return '.' + location.hostname.split('.').slice(-2).join('.');
}

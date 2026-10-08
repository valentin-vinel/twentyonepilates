/**
 * ─────────────────────────────────────────────────────────────
 *  EMPLACEMENT 2 / 5 — Identité visuelle
 *  Seul endroit du projet où une couleur ou une police est écrite.
 *  Landing.astro expose chaque entrée en variable CSS :
 *    colors.bgAlt → --c-bg-alt, fonts.body → --f-body,
 *    easing.inOut → --ease-in-out, radius → --radius, maxWidth → --max-w,
 *  et déclare les @font-face de `fontFaces`.
 *
 *  Règle d'usage des couleurs (vérifiée en contraste, voir global.css) :
 *  - boutons et tout texte sur fond coloré : ink sur bg, ou deepInk sur deep ;
 *  - pink, pinkSoft, roseLight, lavande : aplats décoratifs, bordures et
 *    puces, jamais en fond sous du texte ;
 *  - seul texte en rose : le mot mis en avant d'un titre (*mot*) et la
 *    signature du logo, en pinkSoft (rose du site du studio) sur fond sombre
 *    et sur la photo du hero, et sur fond clair un rose foncé (pink mêlé à
 *    30 % d'ink), pink et pinkSoft purs n'y étant pas lisibles.
 * ─────────────────────────────────────────────────────────────
 */

/** Un fichier de police servi en local depuis public/fonts/. */
export interface FontFace {
  /** Nom de famille, repris tel quel dans `fonts`. */
  family: string;
  /** Nom du fichier woff2 dans public/fonts/. */
  file: string;
  /** Graisse ou plage de graisses (police variable), ex. « 400 » ou « 100 900 ». */
  weight: string;
  style: 'normal' | 'italic';
  /** Police du texte courant : préchargée pour le LCP. Une seule au plus. */
  preload?: boolean;
}

export interface Brand {
  colors: {
    bg: string;
    surface: string;
    bgAlt: string;
    ink: string;
    muted: string;
    accent: string;
    accentInk: string;
    pink: string;
    pinkSoft: string;
    roseLight: string;
    lavande: string;
    deep: string;
    black: string;
    deepAlt: string;
    deepInk: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  easing: {
    out: string;
    inOut: string;
  };
  /** Fichiers woff2 de public/fonts/, licence à côté. */
  fontFaces: readonly FontFace[];
  /**
   * clair : page bg, une section sur trois en deep.
   * inverse : page deep, une section sur trois en bg (proche du site du studio).
   */
  theme: 'clair' | 'inverse';
  radius: string;
  maxWidth: string;
}

export const brand = {
  colors: {
    /** Fond de page. Crème chaud. */
    bg: '#F2EBE0',
    /** Cartes, encadrés. */
    surface: '#FAF6F1',
    /** Fond secondaire, sections alternées. */
    bgAlt: '#E8DDD0',
    /** Texte principal. Brun chocolat profond. */
    ink: '#190C0B',
    /** Texte secondaire. */
    muted: '#5C4035',
    /** Boutons principaux : le brun, pas le rose. Voir note ci-dessous. */
    accent: '#190C0B',
    accentInk: '#F2EBE0',
    /** Rose soutenu : accents, surlignages, bordures actives. */
    pink: '#E8829E',
    /** Rose clair et lavande : aplats décoratifs uniquement, jamais sous du texte. */
    pinkSoft: '#FFB7CE',
    roseLight: '#F5DDE4',
    lavande: '#C4B4CC',
    /** Fond des sections en contraste, et de la page en thème inverse. Fond du site du studio. */
    deep: '#190C0B',
    /** Milieu du dégradé du hero en thème inverse (deep → noir → deep). */
    black: '#000000',
    deepAlt: '#241510',
    deepInk: '#F2EBE0',
    border: '#E8DDD0',
  },
  fonts: {
    heading: '"Montserrat", system-ui, sans-serif',
    body: '"Montserrat", system-ui, sans-serif',
  },
  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    inOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
  },
  fontFaces: [
    // Police variable, sous-ensemble latin (français compris). Licence : OFL-Montserrat.txt.
    { family: 'Montserrat', file: 'montserrat-variable.woff2', weight: '100 900', style: 'normal', preload: true },
  ],
  // Version de test, plus proche du site actuel du studio. 'clair' pour revenir.
  theme: 'inverse',
  // Angles droits partout. Les puces et pastilles rondes (50 %) restent rondes.
  radius: '0px',
  maxWidth: '1180px',
} as const satisfies Brand;

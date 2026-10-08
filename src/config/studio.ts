/**
 * ─────────────────────────────────────────────────────────────
 *  EMPLACEMENT 1 / 5 — Données du studio
 *  Tout ce qui est propre au studio vit ici : textes, prix, téléphone,
 *  avis, équipe, photos. Aucun composant n'en contient.
 *
 *  Les valeurs entre crochets « [ … ] » sont des placeholders : elles
 *  s'affichent telles quelles pour qu'aucun oubli ne passe inaperçu, et le
 *  build les liste dans la console.
 *  Les listes vides masquent l'élément correspondant (section, bandeau, ligne).
 *
 *  Mise en forme des titres :
 *    **mot**  → graisse 700
 *    *mot*    → graisse 700, en rose (un seul par titre)
 *    \n       → retour à la ligne
 *  Jeton remplacé à l'affichage :
 *    {price}    → prix de la séance découverte (`offer.price`), ex. « 15 € »
 * ─────────────────────────────────────────────────────────────
 */

/** Un emplacement photo. Tant que `file` est null, un aplat affiche `subject`. */
export interface PhotoSlot {
  /** Nom du fichier dans src/assets/studio/. null tant que la photo n'est pas livrée. */
  file: string | null;
  /** Ce que la photo doit montrer. Affiché dans l'emplacement tant qu'elle manque. */
  subject: string;
  /** Texte alternatif descriptif. Obligatoire dès que `file` est rempli. */
  alt: string;
  /** Cadrage dans l'emplacement (object-position CSS), ex. « center 35% ». Défaut : centré. */
  focus?: string;
}

/** Une ligne du récapitulatif de la séance découverte. */
export interface Fact {
  label: string;
  value: string;
}

/** Une étape du déroulé de la séance découverte. */
export interface SessionStep {
  title: string;
  text: string;
}

/** Une question de la FAQ. Réponse factuelle, vérifiée auprès du studio. */
export interface FaqItem {
  question: string;
  answer: string;
}

export interface Review {
  text: string;
  /** Prénom et initiale. */
  author: string;
  source: string;
  /** Mois et année de l'avis. */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Avis d'exemple : s'affiche marqué comme tel. À supprimer avant mise en ligne. */
  placeholder?: boolean;
}

export interface Coach {
  firstName: string;
  certification: string;
  photo: PhotoSlot;
}

export interface Studio {
  /** URL publique, pour la balise canonique. Vide : pas de balise. */
  siteUrl: string;
  name: string;
  tagline: string;
  /** Logo dans src/assets/studio/, affiché à gauche du nom. null : le nom seul. */
  logo: string | null;
  /** Adresse sur une ligne, pour le pied de page. */
  address: string;
  /** Raison sociale, pour les mentions légales. */
  legalName: string;
  email: string;
  /**
   * Mentions légales (loi LCEN, art. 6) et politique de confidentialité.
   * Les valeurs entre crochets s'affichent telles quelles : tout remplir avant
   * la mise en ligne. La plupart figurent sur l'extrait Kbis.
   */
  legal: {
    /** SAS, SARL, EURL, entreprise individuelle… */
    form: string;
    /** Capital social, ex. « 1 000 € ». Vide pour une entreprise individuelle. */
    capital: string;
    /** Siège social, s'il diffère de `address`. Vide sinon. */
    headOffice: string;
    /** Ex. « RCS Ville 123 456 789 ». */
    registration: string;
    /** Numéro de TVA intracommunautaire, ou mention d'exonération. */
    vat: string;
    /** Prénom, nom et fonction, ex. « Jeanne Martin, gérante ». */
    publicationDirector: string;
    /** `phone` vide : ligne masquée (hébergeur sans numéro publié). */
    host: { name: string; address: string; phone: string };
  };

  /** Format international, pour le lien tel: (ex. +33612345678). */
  phone: string;
  /** Le numéro tel qu'on le lit. */
  phoneDisplay: string;
  /** Proposé en secondaire, sous chaque appel à l'action : « {phoneAlt} 06 12… ». */
  phoneAlt: string;

  /**
   * Appel à l'action unique : lien direct vers la réservation en ligne de la
   * séance découverte sur Momence. Même libellé et même lien partout.
   */
  cta: {
    label: string;
    /** Lien Momence de la séance découverte (https://momence.com/…), pas la page d'accueil du planning. */
    url: string;
    /** Sous le bouton : ce qui attend la personne en cliquant. Factuel, vérifié sur Momence. */
    note: string;
  };

  meta: {
    title: string;
    description: string;
    /** Aperçu de partage (og:image), recadré en 1200 × 630. Exige `siteUrl`. null : aucun. */
    image: PhotoSlot | null;
  };

  hero: {
    /** Reprend l'accroche de l'annonce Meta. En capitales à l'affichage. */
    title: string;
    photo: PhotoSlot;
  };

  offer: {
    /** Prix de la séance découverte, sans le symbole €. */
    price: string;
    /** Sous le prix dans le hero. */
    priceLabel: string;
    /** Sous le prix dans le hero, ordinateur et mobile. Conditions et cours concernés. */
    perks: string[];
  };

  /**
   * Bandeau sombre sous le hero. Des faits vérifiables uniquement.
   * `mobile: true` : l'élément reste affiché sur mobile, à la suite des `perks`.
   */
  reassurance: { text: string; mobile: boolean }[];

  sections: {
    offer: {
      eyebrow: string;
      title: string;
      text: string;
      /** Récapitulatif factuel de la séance. */
      facts: Fact[];
      /** De la page au cours : réservation en ligne, puis venue au studio, dans l'ordre. */
      steps: string[];
    };
    studio: {
      eyebrow: string;
      title: string;
      text: string;
      swipeHint: string;
      photos: PhotoSlot[];
    };
    /** Déroulé de la séance découverte sur place, dans l'ordre. Vide : section masquée. */
    session: {
      eyebrow: string;
      title: string;
      text: string;
      steps: SessionStep[];
    };
    reviews: { eyebrow: string; title: string };
    faq: { eyebrow: string; title: string };
    team: { eyebrow: string; title: string };
    /** Dernier appel à l'action, avant le pied de page. */
    final: {
      title: string;
      text: string;
      /** Grande photo du bloc final (devanture, salle…). null : aucune. */
      storefront: PhotoSlot | null;
      /** Quatre photos carrées, en grille 2 × 2 à côté de la devanture. */
      photos: PhotoSlot[];
    };
  };

  reviews: Review[];

  /** Vide : la FAQ n'est pas affichée. */
  faq: FaqItem[];

  /** Note relevée sur la fiche Google. null pour masquer. Jamais recopiée de mémoire. */
  googleReview: { rating: number | null; count: number | null } | null;

  /** Vide : la section équipe n'est pas affichée. */
  coaches: Coach[];
}

export const studio: Studio = {
  // Vide tant que l'URL n'est pas connue : pas de balise canonique ni d'og:image.
  siteUrl: '',
  name: 'TWENTY ONE',
  tagline: 'Pilates Reformer • Dijon',
  // Affiché à gauche du nom. Fond transparent : la forme est peinte dans la couleur du texte.
  // null : le nom seul.
  logo: 'logo.png',
  address: '7 passage darcy, 21000 Dijon',
  legalName: 'TWENTY ONE PILATES REFORMER STUDIO',
  email: '21pilatesdijon@gmail.com',
  legal: {
    form: 'SAS',
    capital: '1 000 €',
    headOffice: '5 A rue de Dijon, 21121 Fontaine-lès-Dijon',
    registration: 'RCS Dijon 942 005 067 (SIRET du siège : 942 005 067 00015)',
    vat: 'FR44942005067',
    publicationDirector: 'Btissam Bataoui, co-fondatrice',
    host: {
      name: 'Vercel Inc.',
      address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
      // Vercel ne publie aucun numéro : contact écrit uniquement.
      phone: '',
    },
  },

  phone: '+33756944939',
  phoneDisplay: '07 56 94 49 39',
  phoneAlt: 'Tu préfères appeler ?',

  cta: {
    label: 'Réserver ma séance',
    url: 'https://momence.com/m/830651',
    note: 'Réservé à une première séance. Valable 15 jours après le paiement.',
  },

  meta: {
    title: 'Séance découverte Pilates Reformer à {price} · Twenty One Dijon',
    description: 'Découvre le Pilates Reformer chez Twenty One, au cœur de Dijon : ta première séance à {price}, en petit groupe de 6, à réserver en ligne.',
    image: {
      file: null,
      subject: '[ Image de partage, 1200 × 630 ]',
      alt: '',
    },
  },

  hero: {
    // Reprend l'accroche de l'annonce Meta.
    title: 'Découvre \n**le reformer**, \n*au cœur de Dijon.*',
    photo: {
      file: 'coach-correction.jpg',
      subject: 'Photo hero',
      alt: 'Une coach corrige la posture d’une élève allongée sur un reformer, dans la salle aux miroirs en arche',
      focus: '45% center',
    },
  },

  offer: {
    price: '25',
    priceLabel: 'Séance découverte',
    // Une ligne par élément, ex. 'Réservée à une première visite'.
    perks: [],
  },

  // Faits vérifiables uniquement. Ex. { text: '8 places par cours', mobile: true }.
  // Mobile : trois éléments sur une ligne ; le quatrième n'apparaît que sur ordinateur.
  reassurance: [
    { text: '6 places par cours', mobile: true },
    { text: '50 min par séance', mobile: true },
    { text: '3 coachs', mobile: true },
    { text: '7 j / 7', mobile: false },
  ],
  

  sections: {
    offer: {
      eyebrow: 'La séance découverte',
      title: 'Ta première séance, *à {price}*',
      text: 'Une séance de reformer en petit groupe, pour découvrir le studio et la méthode.',
      // Valeur entre crochets : à relever auprès du studio ou sur Momence.
      facts: [
        { label: 'Cours', value: 'Reformer' },
        { label: 'Durée', value: '50 min' },
        { label: 'Groupe', value: '6 places par cours' },
        { label: 'Pour qui', value: 'Première visite au studio' },
        { label: 'Validité', value: '15 jours après le paiement' },
        { label: 'Tarif', value: '{price}.' },
      ],
      steps: [
        'Tu règles {price} en ligne pour confirmer ta place.',
        'Tu choisis ton créneau sur Momence.',
        'Tu viens au studio pour ta première séance.',
      ],
    },
    studio: {
      eyebrow: 'Le studio',
      title: 'Un studio *à taille humaine*',
      text: 'Au 7 passage Darcy, à Dijon : des cours de reformer à six au plus, avec un coach du studio, 7 jours sur 7.',
      swipeHint: 'Fais glisser pour voir le studio',
      // Six photos au plus (deux rangées de trois). Section masquée si vide.
      // Pour chaque photo livrée :
      // file: 'salle.jpg' (dans src/assets/studio/) et alt descriptif.
      photos: [
        {
          file: 'studio-accueil.jpg',
          subject: 'L\'accueil du studio',
          alt: 'Le coin accueil : canapé crème, table basse fleurie et comptoir en bois clair',
        },
        {
          file: 'reformer-pose.JPG',
          subject: 'Un exercice allongé',
          alt: 'Exercice allongé sur un reformer, un ballon rose sous le genou et la jambe tendue',
          focus: 'center 60%',
        },
        {
          file: 'reformer-machine.jpg',
          subject: 'Un reformer',
          alt: 'Un reformer blanc marqué Twenty One, devant le mur de ballons et cercles roses',
        },
        {
          file: 'groupe-clientes.jpg',
          subject: 'Un moment entre clientes',
          alt: 'Six femmes en tenue de sport discutent en riant, assises sur les reformers, une boisson à la main',
          focus: 'center 40%',
        },
        {
          file: 'fondatrices-exercice.JPG',
          subject: 'Un exercice en duo',
          alt: 'Les fondatrices à genoux sur deux reformers, un ballon rose entre les mains',
          focus: 'center 55%',
        },
        {
          file: 'studio-vestiaires.jpg',
          subject: 'Les vestiaires',
          alt: 'Les vestiaires : casiers en bois, vasque blanche et paniers de serviettes',
        },
      ],
    },
    session: {
      eyebrow: '[ Surtitre du déroulé ]',
      title: '[ Titre du déroulé ]',
      text: '',
      // Le déroulé réel, validé par le studio. Jamais reconstitué de mémoire.
      // Vide : section masquée. Une entrée par étape, dans l'ordre :
      // { title: 'Accueil', text: 'Ce qui se passe, en une ou deux phrases.' },
      steps: [],
    },
    reviews: {
      eyebrow: 'Elles y sont déjà',
      title: "Ce qu'en pensent nos clientes",
    },
    faq: {
      eyebrow: 'Questions fréquentes',
      title: 'Avant ta première séance',
    },
    team: {
      eyebrow: '[ Surtitre de l’équipe ]',
      title: '[ Titre de l’équipe ]',
    },
    final: {
      title: 'Six places par cours,\n *réserve la tienne*',
      text: 'Choisis ton créneau sur Momence et règle {price} en ligne. Ta séance reste valable 15 jours après le paiement.',
      // null : aucune. `focus` règle le cadrage, ex. 'center 35%'.
      storefront: {
        file: 'salle-reformers.JPG',
        subject: 'La salle et les reformers',
        alt: 'La salle du studio : reformers alignés, ballons roses, miroirs en arche et plafond drapé',
      },
      // Zéro ou quatre photos carrées. Ex. { file: 'accueil.jpg', subject: 'Photo carrée 1', alt: '…' }.
      photos: [
        {
          file: 'portrait-fondatrices.JPG',
          subject: 'Les fondatrices',
          alt: 'Les deux fondatrices du studio, souriantes, assises sur un reformer avec un ballon rose',
          focus: 'center 35%',
        },
        {
          file: 'reformer-accessoires.JPG',
          subject: 'Le mur d\'accessoires',
          alt: 'Un reformer devant le mur d’accessoires : ballons et cercles roses, miroir en arche éclairé',
          focus: 'center 40%',
        },
        {
          file: 'ambiance-post-seance.jpg',
          subject: 'Après la séance',
          alt: 'Trois boissons glacées aux couleurs du studio, posées sur un reformer : café, matcha, smoothie rose',
        },
        {
          file: 'portrait-btissam.JPG',
          subject: 'Un exercice avec accessoire',
          alt: 'Une pratiquante à genoux sur un reformer tient un cercle de Pilates rose',
          focus: 'center 30%',
        },
        
      ],
    },
  },

  // Uniquement des avis réels, copiés depuis leur source. Ne jamais en inventer.
  // Section masquée tant que la liste est vide. Une entrée par avis :
  // { text: '…', author: 'Prénom', source: 'Google', date: 'Mois 2026', rating: 5 },
  // Les emplacements (placeholder: true) s'affichent marqués « Avis d'exemple » :
  // les remplacer par de vrais avis, ou les supprimer, avant la mise en ligne.
  reviews: [
    {
      text: 'Première expérience en Pilates Reformer et j’ai adoré ! Un grand merci à Sanaë pour son professionnalisme, sa douceur et son accompagnement tout au long de la séance. Les exercices étaient variés, exigeants et très efficaces. Le studio est agréable, le matériel est impeccable et de grande qualité. Une très belle découverte que je recommande sans hésiter. J’ai déjà hâte de revenir !',
      author: 'Corine',
      source: 'Google',
      date: 'Juillet 2026',
      rating: 5,
      placeholder: false,
    },
    {
      text: 'Première séance de Pilates pour moi et j’ai adoré ! La coach est très gentille, patiente et explique super bien. Le petit groupe rend le cours très agréable et rassurant. Je recommande à 100 % !',
      author: 'Amandine',
      source: 'Google',
      date: 'Janvier 2026',
      rating: 5,
      placeholder: false,
    },
    {
      text: '1er cours de pilate reformer incroyable! Merci Manale! Une coach attentive, bienveillante et à la voix douce. Séance super intense. Exercices au top. Lieu et matériel de très bonne qualité. Je recommande ++ je reviendrai :)',
      author: 'Mathilde',
      source: 'Google',
      date: 'Juin 2026',
      rating: 5,
      placeholder: false,
    },
    {
      text: 'Agréable séance pour une découverte du Pilate reformer. Lieux cosy, la coach nous corrige avec douceur ce qui met très à l’aise.',
      author: 'Anais',
      source: 'Google',
      date: 'Avril 2026',
      rating: 5,
      placeholder: false,
    },
    {
      text: "Ce studio est une véritable révélation! L'ambiance est incroyable, à la fois girly, chaleureuse et apaisante. Les coach sont non seulement professionnelles mais aussi très attentives aux besoins de chaque participant. Les séances sont variées et adaptées à tous les niveaux. On se sent toujours accueil avec bienveillance ! Je recommande vivement, allez-y les yeux fermés ! 😊",
      author: 'Anissa',
      source: 'Google',
      date: 'Juillet 2025',
      rating: 5,
      placeholder: false,
    },
    {
      text: "Première séance aujourd'hui et j'étais agréablement surprise. La complexité des mouvements et de l'équilibre rendent la séance très intense et intéressante. Je reviendrai certainement",
      author: 'Logan',
      source: 'Google',
      date: 'Décembre 2025',
      rating: 5,
      placeholder: false,
    },
    {
      text: "Si vous hésitez à réserver ? Sautez le pas vous ne le regretterez pas ! J’ai commencé ma première séance il y’a deux semaines et je suis déjà accro 🥰❤️ !!!! Une fois l’appréhension du reformer passé vous allez adorer ! Sanaë et Faiza sont bienveillantes et patientes dans la réalisation des mouvements ! Superbe expérience ❤️❤️",
      author: 'Ingrid',
      source: 'Google',
      date: 'Juillet 2025',
      rating: 5,
      placeholder: false,
    },
  ],

  // Uniquement des réponses vérifiées auprès du studio. Une réponse entre
  // crochets s'affiche telle quelle et déclenche un avertissement au build.
  // Pas de doublon avec le reste de la page (prix, durée, groupe, réservation,
  // données personnelles y sont déjà). Vide : FAQ masquée.
  // { question: '…', answer: '…' },
  // Questions courantes avant un premier cours de reformer. Réponses à faire
  // valider par le studio ; supprimer celles qui ne s'appliquent pas.
  faq: [
    {
      question: "Le Pilates Reformer, c'est pour qui ?",
      answer: "Pour toutes. Débutantes, sportives confirmées, mamans en post-partum, dos fragiles, personnes en reprise d'activité. Le Reformer s'adapte à chaque corps, et nos coachs s'adaptent à chaque personne. Aucun niveau minimum requis.",
    },
    {
      question: 'Que dois-je apporter ?',
      answer: "Une tenue confortable et des chaussettes antidérapantes (en vente à l'accueil). Le reste, serviettes, coin beauté, boissons bien-être (matcha, collagène, protéines), on s'en occupe.",
    },
    {
      question: 'Pourquoi seulement 6 places par séance ?',
      answer: "Parce que c'est la seule façon d'assurer un vrai suivi personnalisé. Au-delà de 6 personnes, il est impossible pour une coach de voir tout le monde, de corriger chaque posture, d'adapter chaque exercice. Ce choix, c'est notre engagement envers toi.",
    },
    {
      question: 'Comment venir au studio ?',
      answer: '7 Passage Darcy, 21000 Dijon. En tram : arrêt Darcy (T1 et T2). En voiture : parkings Grangier et Darcy à 2 min. Un ticket de stationnement 2h et un ticket de tram sont offerts à chaque séance.',
    },
    {
      question: 'Y a-t-il des vestiaires et des douches ?',
      answer: 'Oui, le studio est équipé de vestiaires et douches.',
    },
  ],

  // Note relevée sur la fiche Google, avec les avis. Ex. { rating: 4.9, count: 98 }.
  googleReview: { rating: 5, count: 18 },

  // Section masquée tant que la liste est vide. Une entrée par coach :
  // {
  //   firstName: 'Prénom',
  //   certification: 'Certifiée Pilates reformer',
  //   photo: { file: 'coach-prenom.jpg', subject: 'Portrait', alt: 'Prénom, coach, dans la salle' },
  // },
  coaches: [],
};

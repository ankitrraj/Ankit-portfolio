// Mock data for La puce à l'oreille clone

export const navLinks = {
  primary: [
    { label: 'Explorer', hasDropdown: true, path: '/balados' },
    { label: 'Événements', hasDropdown: false, path: '/evenements' },
    { label: 'Affiches amplifiées', hasDropdown: false, path: '/affiches' },
  ],
  secondary: [
    { label: 'À propos', href: '/a-propos' },
    { label: 'Médiation', href: '/mediation' },
    { label: 'Confidentialité', href: '/confidentialite' },
  ],
};

export const exploreItems = [
  { label: 'Tous les balados', href: '/balados' },
  { label: 'Sciences & nature', href: '/balados#sciences' },
  { label: 'Contes & histoires', href: '/balados#contes' },
  { label: 'Émotions & intimité', href: '/balados#emotions' },
  { label: 'Société & histoire', href: '/balados#societe' },
  { label: 'Arts & culture', href: '/balados#arts' },
  { label: 'Allo la puce', href: '/balados#allo' },
  { label: 'Pour les profs', href: '/balados#profs' },
];

export const heroIntro = `La puce à l'oreille crée des balados pour les enfants! Dans son temps libre, elle se balade aussi dans les écoles, les bibliothèques, les musées, les festivals, partout où il y a des enfants à émerveiller.`;

export const podcasts = [
  { id: 'terre-academie', title: 'Terre Académie | Biosphère de Montréal', category: 'Sciences & nature', color: '#84BFFF', featured: true },
  { id: 'facteur-espace', title: "Le facteur de l'espace – Saison 2 | Balado | La Pastèque", category: 'Contes & histoires', color: '#EF724F' },
  { id: 'memos-vocaux', title: 'Mémos Vocaux', category: 'Émotions & intimité', color: '#981082' },
  { id: 'bonnes-nouvelles', title: "Les bonnes nouvelles des As de l'info", category: 'Société & histoire', color: '#E7DB4C' },
  { id: 'expression', title: "J'adore cette expression!", category: 'Arts & culture', color: '#ACE2DF', featured: true },
  { id: 'voix-lactee', title: 'La voix lactée', category: 'Contes & histoires', color: '#84BFFF' },
  { id: 'enquetes-puce', title: 'Les enquêtes de la puce', category: 'Sciences & nature', color: '#EF724F' },
  { id: 'petites-pousses', title: 'Petites pousses', category: 'Émotions & intimité', color: '#E7DB4C' },
];

export const relatedEvents = [
  { id: 'a-lecoute', title: "À l'écoute!", description: "À l'écoute! est la toute nouvelle série de balados documentaires pour enfants imaginée par La puce à l'oreille en partenariat avec des maisons d'édition québécoises.", cta: 'Découvrir tous les balados' },
  { id: 'club-profs', title: 'Le Club des profs', description: "Le tout nouveau Club des profs de La puce à l'oreille vous propose des ressources pédagogiques, de la documentation et des éléments de veille pour utiliser et créer des balados avec les jeunes publics!", cta: 'Découvrir le Club des profs' },
  { id: 'projet', title: 'Vous avez un projet?', description: 'Vous avez une idée, une envie, un projet? Nous sommes là pour vous aider!', cta: 'En apprendre plus' },
];

export const marqueeWords = ['Balados', 'Histoires', 'Aventures', 'Émerveillement', 'Curiosité', 'Imaginaire', 'Découvertes'];

export const footerLinks = {
  navigation: ['Tous les balados', 'Événements', 'Affiches amplifiées', 'Pour les profs', 'À propos', 'Médiation', 'Nous contacter'],
  social: [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Spotify', href: '#' },
  ],
};

export const BRAND_COLORS = ['#84BFFF', '#EF724F', '#981082', '#E7DB4C', '#ACE2DF', '#F0A8DD'];

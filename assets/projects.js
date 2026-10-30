/* linh b. — liste des projets du portfolio (EN + FR)

   POUR AJOUTER UN VISUEL ORIGINAL :
   1. dépose le fichier à plat (jpg/png) dans images/projets/
   2. remplis le champ img du projet, ex. img: "images/projets/panza-logo.jpg"
   Tant que img est vide (""), le portfolio affiche une case vide avec le nom du client.
   Pour un visuel à plat (logo) : ajouter bg: "#couleur du fond" pour l'afficher en entier,
   centré sur cette couleur, au lieu d'être recadré.

   Pour l'instant, les anciennes images (montages) sont affichées en attendant les originaux.

   cat : branding · print · editorial · web · digital · design            */

const PROJECTS = [
  // ── branding ──────────────────────────────────────────
  { client: "analekta", type: { en: "marketing item", fr: "article promotionnel" }, field: { en: "Music", fr: "Musique" }, cat: "print", year: "2026", img: "images/SUPPORT/analekta-signet-blanc.jpg?v=2" },
  { client: "tomaté!", type: { en: "point-of-sale display", fr: "présentoir" }, field: { en: "Agriculture", fr: "Agriculture" }, cat: "print", year: "2026", img: "images/SUPPORT/tomate-presentoir-blanc.jpg", bg: "#FFFFFF" },
  { client: "Convatec", type: { en: "trade show booth", fr: "kiosque d'exposition" }, field: { en: "Pharmaceutical", fr: "Pharmaceutique" }, cat: "print", year: "2026", img: "images/Kiosque-blanc.jpg" },
  { client: "Consentia", type: { en: "logo", fr: "logo" }, field: { en: "Non-profit", fr: "OBNL" }, cat: "branding", year: "2026", img: "images/LOGO/consentia-logo.jpg", bg: "#FFFFFF", zoom: 3, focus: "42% 52%" },
  { client: "Dandelion", type: { en: "logo", fr: "logo" }, field: { en: "Branding", fr: "Image de marque" }, cat: "branding", year: "2026", img: "images/LOGO/dandelion-blanc.jpg?v=hd1", zoom: 3.4, focus: "28% 55%", bg: "#FFFFFF" },
  { client: "Épicerie les récoltes", type: { en: "logo", fr: "logo" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "branding", year: "2026", img: "images/LOGO/recoltes-logo.jpg?v=hd1", zoom: 3.2, focus: "62% 55%", bg: "#FFFFFF" },
  { client: "Fly", type: { en: "logo", fr: "logo" }, field: { en: "Application", fr: "Application" }, cat: "branding", year: "2017", img: "images/LOGO/fly-blanc.jpg?v=hd1", zoom: 2.4, focus: "30% 45%", bg: "#FFFFFF" },
  { client: "Fly", type: { en: "logo", fr: "logo" }, field: { en: "Application", fr: "Application" }, cat: "branding", year: "2017", img: "images/LOGO/fly-rouge.jpg?v=hd1", zoom: 2.4, focus: "30% 45%", bg: "#ED1B24" },
  { client: "Girouette", type: { en: "logo", fr: "logo" }, field: { en: "Ice cream restaurant", fr: "Crèmerie" }, cat: "branding", year: "2026", img: "images/LOGO/girouette-logo.jpg?v=hd1", zoom: 3.4, focus: "20% 42%", bg: "#FFFFFF" },
  { client: "Les Ancêtres", type: { en: "logo", fr: "logo" }, field: { en: "Rugby club", fr: "Club de rugby" }, cat: "branding", year: "2026", img: "images/LOGO/ancetre.jpg", zoom: 2.6, focus: "50% 42%", bg: "#FFFFFF" },
  { client: "Panza", type: { en: "logo", fr: "logo" }, field: { en: "Software", fr: "Logiciel" }, cat: "branding", year: "2026", img: "images/LOGO/panza-logo.jpg?v=hd2", zoom: 3, focus: "24% 50%", bg: "#FFFFFF" },
  { client: "Sainte fumée", type: { en: "logo", fr: "logo" }, field: { en: "Designer", fr: "Designer" }, cat: "branding", year: "2026", img: "images/LOGO/sainte-fumee-logo.jpg?v=3", zoom: 3, focus: "50% 42%", bg: "#FFFFFF" },

  // ── print ─────────────────────────────────────────────
  { client: "Vinos y Tango", type: { en: "flyer", fr: "dépliant" }, field: { en: "Events", fr: "Événements" }, cat: "print", year: "2026", img: "images/flyer-invitation.jpg" },
  { client: "Consentia", type: { en: "business card", fr: "carte d'affaires" }, field: { en: "Non-profit", fr: "OBNL" }, cat: "print", year: "2026", img: "images/carte-affaires-consentia.jpg" },
  { client: "EauVie", type: { en: "invitation", fr: "invitation" }, field: { en: "Developer", fr: "Promoteur" }, cat: "print", year: "2026", img: "images/invitation-eauvie-blanc.jpg" },
  { client: "Fresh from the farm", clientFr: "En direct de la ferme", type: { en: "brochure", fr: "brochure" }, field: { en: "Distributor", fr: "Distributeur" }, cat: "print", year: "2026", img: "images/brochure-epicerie.jpg" },
  { client: "DXP", type: { en: "brochure", fr: "brochure" }, field: { en: "Management", fr: "Gestion" }, cat: "print", year: "2026", img: "images/brochure-dxp.jpg" },
  { client: "Radio-Canada", type: { en: "series poster", fr: "affiche de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/existence.jpg?v=2", bg: "#FFFFFF" },
  { client: "Radio-Canada", type: { en: "series poster", fr: "affiche de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/killing-jane.jpg?v=2", bg: "#FFFFFF" },
  { client: "Radio-Canada", type: { en: "series flyer", fr: "dépliant de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/oli-drags.jpg", bg: "#FFFFFF" },
  { client: "Radio-Canada", type: { en: "game cover", fr: "pochette de jeu" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/jeux-blanc.jpg" },

  // ── editorial ─────────────────────────────────────────
  { client: "Private", clientFr: "Privé", type: { en: "brochure cover", fr: "couverture de brochure" }, field: { en: "Design", fr: "Design" }, cat: "editorial", year: "2026", img: "images/couverture-brochure-blanc.jpg" },
  { client: "Fresh from the farm", clientFr: "En direct de la ferme", type: { en: "annual report", fr: "bilan annuel" }, field: { en: "Distributor", fr: "Distributeur" }, cat: "editorial", year: "2026", img: "images/bilan-annuel.jpg" },
  { client: "Québec Amérique", type: { en: "cover illustration", fr: "illustration de couverture" }, field: { en: "Publisher", fr: "Éditeur" }, cat: "editorial", year: "2026", img: "images/illustration-livre-blanc.jpg" },
  { client: "Épicerie les récoltes", type: { en: "poster", fr: "affiche" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "editorial", year: "2026", img: "images/Affiche/affiches-regions.jpg?v=hr3" },
  { client: "Convatec", type: { en: "product catalog", fr: "catalogue de produits" }, field: { en: "Pharmaceutical", fr: "Pharmaceutique" }, cat: "editorial", year: "2025–2026", img: "images/Catalogue/catalogue-convatec.jpg", zoom: 2, focus: "4% 40%" },

  // ── web : aperçu du site en direct ────────────────────
  { client: "Fly", type: { en: "website", fr: "site web" }, field: { en: "Application", fr: "Application" }, cat: "web", year: "2017", site: "images/WEB/fly/index.html" },
  { client: "Les récoltes", type: { en: "website", fr: "site web" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "web", year: "2019", site: "images/WEB/lesrecoltes/index.html" },
  { client: "VIC", type: { en: "website", fr: "site web" }, field: { en: "Photography", fr: "Photographie" }, cat: "web", year: "2023", site: "images/WEB/VIC/index.html" },
  { client: "Mobilier", type: { en: "website", fr: "site web" }, field: { en: "Furniture", fr: "Mobilier" }, cat: "web", year: "2026", site: "images/WEB/mobilier/index.html" },
  { client: "Marie-Pascale Bélanger", type: { en: "website", fr: "site web" }, field: { en: "Theatre company", fr: "Compagnie de théâtre" }, cat: "web", year: "2026", site: "images/WEB/projets-de-lombre/index.html" },

  // ── digital ───────────────────────────────────────────
  { client: "Hussard", type: { en: "illustration", fr: "illustration" }, field: { en: "Online sales", fr: "Vente en ligne" }, cat: "digital", year: "2026", img: "images/illustration/hussard-tshirt.jpg", bg: "#FFFFFF" },
  { client: "tomaté!", type: { en: "social media", fr: "réseaux sociaux" }, field: { en: "Agriculture", fr: "Agriculture" }, cat: "digital", year: "2026", img: "images/rs/reseaux_sociaux_tomate.jpg", link: { url: "https://www.instagram.com/tomate.tomate.tomate/", label: "Instagram" } },

  // ── design ────────────────────────────────────────────
  { client: "tomaté!", type: { en: "presentation", fr: "présentation" }, field: { en: "Agriculture", fr: "Agriculture" }, cat: "design", year: "2026", img: "images/presentation/presentation-tomate-slides.jpg" },
];

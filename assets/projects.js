/* linh b. — liste des projets du portfolio (EN + FR)

   POUR AJOUTER UN VISUEL ORIGINAL :
   1. dépose le fichier à plat (jpg/png) dans images/projets/
   2. remplis le champ img du projet, ex. img: "images/projets/panza-logo.jpg"
   Tant que img est vide (""), le portfolio affiche une case vide avec le nom du client.

   Pour l'instant, les anciennes images (montages) sont affichées en attendant les originaux.

   cat : branding · print · editorial · web · digital · design            */

const PROJECTS = [
  // ── branding ──────────────────────────────────────────
  { client: "analekta", type: { en: "marketing item", fr: "article promotionnel" }, field: { en: "Music", fr: "Musique" }, cat: "branding", year: "2026", img: "images/signet-angele.jpg" },
  { client: "tomaté!", type: { en: "point-of-sale display", fr: "présentoir" }, field: { en: "Agriculture", fr: "Agriculture" }, cat: "branding", year: "2026", img: "images/SUPPORT/marketing1.png" },
  { client: "Convatec", type: { en: "trade show booth", fr: "kiosque d'exposition" }, field: { en: "Pharmaceutical", fr: "Pharmaceutique" }, cat: "branding", year: "2026", img: "images/Kiosque.png" },
  { client: "Panza", type: { en: "logo", fr: "logo" }, field: { en: "Software", fr: "Logiciel" }, cat: "branding", year: "2026", img: "images/LOGO/PANZA.jpg" },
  { client: "Sainte fumée", type: { en: "logo", fr: "logo" }, field: { en: "Designer", fr: "Designer" }, cat: "branding", year: "2026", img: "images/LOGO/st.jpg" },
  { client: "Fly", type: { en: "logo", fr: "logo" }, field: { en: "Application", fr: "Application" }, cat: "branding", year: "2026", img: "images/LOGO/fly.jpg" },
  { client: "Épicerie les récoltes", type: { en: "logo", fr: "logo" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "branding", year: "2026", img: "images/LOGO/recoltes.jpg" },
  { client: "Girouette", type: { en: "logo", fr: "logo" }, field: { en: "Ice cream restaurant", fr: "Crèmerie" }, cat: "branding", year: "2026", img: "images/LOGO/girouette.jpg" },
  { client: "Les Ancêtres", type: { en: "logo", fr: "logo" }, field: { en: "Rugby club", fr: "Club de rugby" }, cat: "branding", year: "2026", img: "images/LOGO/ancetre.jpg" },
  { client: "Girouette", type: { en: "identity", fr: "identité visuelle" }, field: { en: "Ice cream restaurant", fr: "Crèmerie" }, cat: "branding", year: "2026", img: "images/identité/girouette.jpg" },

  // ── print ─────────────────────────────────────────────
  { client: "Vinos y Tango", type: { en: "flyer", fr: "dépliant" }, field: { en: "Events", fr: "Événements" }, cat: "print", year: "2026", img: "images/flyer-invitation.jpg" },
  { client: "Consentia", type: { en: "business card", fr: "carte d'affaires" }, field: { en: "Non-profit", fr: "OBNL" }, cat: "print", year: "2026", img: "images/carte-affaires-consentia.jpg" },
  { client: "EauVie", type: { en: "invitation", fr: "invitation" }, field: { en: "Developer", fr: "Promoteur" }, cat: "print", year: "2026", img: "images/invitation-eauvie.jpg" },
  { client: "Fresh from the farm", type: { en: "brochure", fr: "brochure" }, field: { en: "Distributor", fr: "Distributeur" }, cat: "print", year: "2026", img: "images/brochure-epicerie.jpg" },
  { client: "DXP", type: { en: "brochure", fr: "brochure" }, field: { en: "Management", fr: "Gestion" }, cat: "print", year: "2026", img: "images/brochure-dxp.jpg" },
  { client: "Radio-Canada", type: { en: "series poster", fr: "affiche de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/poster_cine.png" },
  { client: "Radio-Canada", type: { en: "series flyer", fr: "dépliant de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/flyer.jpg" },
  { client: "Radio-Canada", type: { en: "series artwork", fr: "visuel de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/art1.png" },
  { client: "Radio-Canada", type: { en: "series artwork", fr: "visuel de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/art2.png" },
  { client: "Radio-Canada", type: { en: "game cover", fr: "pochette de jeu" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/jeux.png" },

  // ── editorial ─────────────────────────────────────────
  { client: "Private", clientFr: "Privé", type: { en: "brochure cover", fr: "couverture de brochure" }, field: { en: "Design", fr: "Design" }, cat: "editorial", year: "2026", img: "images/couverture-brochure.jpg" },
  { client: "Fresh from the farm", type: { en: "annual report", fr: "bilan annuel" }, field: { en: "Distributor", fr: "Distributeur" }, cat: "editorial", year: "2026", img: "images/bilan-annuel.jpg" },
  { client: "Québec Amérique", type: { en: "cover illustration", fr: "illustration de couverture" }, field: { en: "Publisher", fr: "Éditeur" }, cat: "editorial", year: "2026", img: "images/illustration-livre.jpg" },
  { client: "Épicerie les récoltes", type: { en: "poster", fr: "affiche" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "editorial", year: "2026", img: "images/Affiche/affiches.png" },
  { client: "Convatec", type: { en: "product catalog", fr: "catalogue de produits" }, field: { en: "Pharmaceutical", fr: "Pharmaceutique" }, cat: "editorial", year: "2023", img: "images/Catalogue/Catalog.png" },

  // ── web : aperçu du site en direct ────────────────────
  { client: "Fly", type: { en: "website", fr: "site web" }, field: { en: "Application", fr: "Application" }, cat: "web", year: "2026", site: "images/WEB/fly/index.html" },
  { client: "Les récoltes", type: { en: "website", fr: "site web" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "web", year: "2026", site: "images/WEB/lesrecoltes/index.html" },
  { client: "VIC", type: { en: "website", fr: "site web" }, field: { en: "Photography", fr: "Photographie" }, cat: "web", year: "2026", site: "images/WEB/VIC/index.html" },
  { client: "Mobilier", type: { en: "website", fr: "site web" }, field: { en: "Furniture", fr: "Mobilier" }, cat: "web", year: "2026", site: "images/WEB/mobilier/index.html" },

  // ── digital ───────────────────────────────────────────
  { client: "Private", clientFr: "Privé", type: { en: "illustration", fr: "illustration" }, field: { en: "Illustration", fr: "Illustration" }, cat: "digital", year: "2026", img: "images/illustration/enseigne_illus.jpg" },
  { client: "Convatec", type: { en: "illustration", fr: "illustration" }, field: { en: "Pharmaceutical", fr: "Pharmaceutique" }, cat: "digital", year: "2026", img: "images/illustration/hands_illus.jpg" },
  { client: "Hussard", type: { en: "illustration", fr: "illustration" }, field: { en: "Online sales", fr: "Vente en ligne" }, cat: "digital", year: "2026", img: "images/illustration/zamboni_illus.jpg" },
  { client: "tomaté!", type: { en: "social media", fr: "réseaux sociaux" }, field: { en: "Agriculture", fr: "Agriculture" }, cat: "digital", year: "2026", img: "images/rs/reseaux_sociaux_tomate.jpg" },
  { client: "Hussard boutique", type: { en: "social media", fr: "réseaux sociaux" }, field: { en: "Online sales", fr: "Vente en ligne" }, cat: "digital", year: "2026", img: "images/rs/reseaux_sociaux_hussard.jpg" },

  // ── design ────────────────────────────────────────────
  { client: "CDPQ", type: { en: "presentation", fr: "présentation" }, field: { en: "Finance", fr: "Finance" }, cat: "design", year: "2026", img: "images/presentation/powerpoint-cdpq.jpg" },
  { client: "tomaté!", type: { en: "presentation", fr: "présentation" }, field: { en: "Agriculture", fr: "Agriculture" }, cat: "design", year: "2026", img: "images/presentation/presentation_tom.jpg" },
];

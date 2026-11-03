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
  { client: "Consentia", type: { en: "logo", fr: "logo" }, field: { en: "Non-profit", fr: "OBNL" }, cat: "branding", year: "2013", img: "images/LOGO/consentia-logo.jpg", bg: "#FFFFFF", zoom: 3, focus: "42% 52%",
    desc: { fr: "OBNL dédiée à la défense des enfants dans le monde. Mandat : exprimer la douceur et la joie à travers le logo.", en: "Non-profit dedicated to defending children around the world. Brief: convey gentleness and joy through the logo.", vi: "Tổ chức phi lợi nhuận bảo vệ trẻ em trên khắp thế giới. Yêu cầu: thể hiện sự dịu dàng và niềm vui qua logo." } },
  { client: "Dandelion", type: { en: "logo", fr: "logo" }, field: { en: "Horticulture", fr: "Horticulture" }, cat: "branding", year: "2026", img: "images/LOGO/dandelion-orange-v2.jpg", zoom: 3, focus: "30% 46%", bg: "#F27C22",
    desc: { fr: "Mandat : représenter le mot avec une typo généreuse et marquante, à l'image des services proposés.", en: "Brief: render the name in a generous, striking typeface, like the services offered.", vi: "Yêu cầu: thể hiện tên bằng kiểu chữ đầy đặn, ấn tượng, như chính các dịch vụ được cung cấp." } },
  { client: "Épicerie les récoltes", type: { en: "logo", fr: "logo" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "branding", year: "2026", img: "images/LOGO/recoltes-noir.jpg", zoom: 2.6, focus: "60% 58%", bg: "#000000",
    desc: { fr: "Épicerie de produits locaux. Mandat : indiquer que les produits sont directement acheminés par les producteurs, sans intermédiaire.", en: "Local food grocery. Brief: show that products come straight from the producers, with no middleman.", vi: "Cửa hàng thực phẩm địa phương. Yêu cầu: thể hiện rằng sản phẩm được chuyển thẳng từ nhà sản xuất, không qua trung gian." } },
  { client: "Fly", type: { en: "logo", fr: "logo" }, field: { en: "Application", fr: "Application" }, cat: "branding", year: "2017", img: "images/LOGO/fly-rouge.jpg?v=hd1", zoom: 2.4, focus: "30% 45%", bg: "#ED1B24",
    desc: { fr: "Application pour les spéciaux des commerces participants. Mandat : projeter un côté urbain, branché et ludique.", en: "App for special offers from participating businesses. Brief: project an urban, trendy and playful feel.", vi: "Ứng dụng ưu đãi của các cửa hàng tham gia. Yêu cầu: thể hiện phong cách đô thị, sành điệu và vui nhộn." } },
  { client: "Girouette", type: { en: "logo", fr: "logo" }, field: { en: "Ice cream restaurant", fr: "Crèmerie" }, cat: "branding", year: "2026", img: "images/LOGO/girouette-or.jpg", zoom: 3, focus: "17% 47%", bg: "#C09F40",
    desc: { fr: "Commerce de denrées faites maison. Mandat : moderniser l'aspect général de l'ancien nom du commerce.", en: "Shop selling homemade goods. Brief: modernize the overall look of the shop's long-standing name.", vi: "Cửa hàng thực phẩm tự làm. Yêu cầu: làm mới diện mạo tổng thể cho tên cũ của cửa hàng." } },
  { client: "Les Ancêtres", type: { en: "logo", fr: "logo" }, field: { en: "Rugby club", fr: "Club de rugby" }, cat: "branding", year: "2023", img: "images/LOGO/ancetres-blason.jpg", zoom: 2.6, focus: "50% 45%", bg: "#0E2340",
    desc: { fr: "Mandat : moderniser le logo existant en intégrant le rugby et les valeurs d'origine française de ce club basé à Montréal.", en: "Brief: modernize the existing logo by bringing in rugby and the French-rooted values of this Montréal-based club.", vi: "Yêu cầu: hiện đại hóa logo hiện có, kết hợp môn bóng bầu dục và những giá trị gốc Pháp của câu lạc bộ có trụ sở tại Montréal này." } },
  { client: "Panza", type: { en: "logo", fr: "logo" }, field: { en: "Software", fr: "Logiciel" }, cat: "branding", year: "2024", img: "images/LOGO/panza-vert.jpg", zoom: 2.6, focus: "24% 50%", bg: "#D3E7D4",
    desc: { fr: "Logiciel de paiement pour petits commerces. Mandat : afficher un côté à la fois complexe et fluide.", en: "Payment software for small businesses. Brief: convey something both complex and fluid.", vi: "Phần mềm thanh toán cho cửa hàng nhỏ. Yêu cầu: thể hiện vừa phức tạp vừa uyển chuyển." } },
  { client: "Sainte fumée", type: { en: "logo", fr: "logo" }, field: { en: "Designer", fr: "Designer" }, cat: "branding", year: "2026", img: "images/LOGO/sainte-fumee-fonce.jpg", zoom: 2.8, focus: "26% 40%", bg: "#3F3F3F",
    desc: { fr: "Projet de fumoir en carton. Mandat : créer un logo parlant, à la fois rustique et chaleureux.", en: "Cardboard smoker project. Brief: create a telling logo, both rustic and warm.", vi: "Dự án lò hun khói bằng bìa cứng. Yêu cầu: tạo một logo biết kể chuyện, vừa mộc mạc vừa ấm áp." } },

  // ── print ─────────────────────────────────────────────
  { client: "Vinos y Tango", type: { en: "flyer", fr: "dépliant" }, field: { en: "Events", fr: "Événements" }, cat: "print", year: "2018", img: "images/flyer-invitation.jpg" },
  { client: "Consentia", type: { en: "business card", fr: "carte d'affaires" }, field: { en: "Non-profit", fr: "OBNL" }, cat: "print", year: "2026", img: "images/carte-affaires-consentia.jpg" },
  { client: "EauVie", type: { en: "invitation", fr: "invitation" }, field: { en: "Developer", fr: "Promoteur" }, cat: "print", year: "2017", img: "images/invitation-eauvie-blanc.jpg" },
  { client: "Fresh from the farm", clientFr: "En direct de la ferme", type: { en: "brochure", fr: "brochure" }, field: { en: "Distributor", fr: "Distributeur" }, cat: "print", year: "2015", img: "images/brochure-epicerie.jpg" },
  { client: "DXP", type: { en: "brochure", fr: "brochure" }, field: { en: "Management", fr: "Gestion" }, cat: "print", year: "2019", img: "images/brochure-dxp.jpg" },
  { client: "Radio-Canada", type: { en: "series poster", fr: "affiche de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/existence.jpg?v=2", bg: "#FFFFFF" },
  { client: "Radio-Canada", type: { en: "series poster", fr: "affiche de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/killing-jane.jpg?v=2", bg: "#FFFFFF" },
  { client: "Radio-Canada", type: { en: "series flyer", fr: "dépliant de série" }, field: { en: "Television series", fr: "Série télé" }, cat: "print", year: "2023", img: "images/poster/oli-drags.jpg", bg: "#FFFFFF" },

  // ── editorial ─────────────────────────────────────────
  { client: "Private", clientFr: "Privé", type: { en: "brochure cover", fr: "couverture de brochure" }, field: { en: "Design", fr: "Design" }, cat: "editorial", year: "2016", img: "images/brochure-asie.jpg" },
  { client: "Fresh from the farm", clientFr: "En direct de la ferme", type: { en: "annual report", fr: "bilan annuel" }, field: { en: "Distributor", fr: "Distributeur" }, cat: "editorial", year: "2016", img: "images/bilan-annuel.jpg" },
  { client: "Québec Amérique", type: { en: "cover illustration", fr: "illustration de couverture" }, field: { en: "Publisher", fr: "Éditeur" }, cat: "editorial", year: "2022", img: "images/illustration-livre-blanc.jpg" },
  { client: "Épicerie les récoltes", type: { en: "poster", fr: "affiche" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "editorial", year: "2021", img: "images/Affiche/affiches-regions.jpg?v=hr3" },
  { client: "Convatec", type: { en: "product catalog", fr: "catalogue de produits" }, field: { en: "Pharmaceutical", fr: "Pharmaceutique" }, cat: "editorial", year: "2025–2026", img: "images/Catalogue/catalogue-convatec.jpg", zoom: 2, focus: "4% 40%" },
  { client: "Convatec", type: { en: "information sheet", fr: "fiche d'information" }, field: { en: "Pharmaceutical", fr: "Pharmaceutique" }, cat: "editorial", year: "2026", img: "images/convatec-wound-hygiene.jpg", zoom: 2.4, focus: "30% 45%", group: "wound-hygiene" },

  // ── web : aperçu du site en direct ────────────────────
  { client: "Fly", type: { en: "website", fr: "site web" }, field: { en: "Application", fr: "Application" }, cat: "web", year: "2017", site: "images/WEB/fly/index.html" },
  { client: "Les récoltes", type: { en: "website", fr: "site web" }, field: { en: "Grocery", fr: "Épicerie" }, cat: "web", year: "2019", site: "images/WEB/lesrecoltes/index.html" },
  { client: "VIC", type: { en: "website", fr: "site web" }, field: { en: "Photography", fr: "Photographie" }, cat: "web", year: "2023", site: "images/WEB/VIC/index.html" },
  { client: "Mobilier", type: { en: "website", fr: "site web" }, field: { en: "Furniture", fr: "Mobilier" }, cat: "web", year: "2026", site: "images/WEB/mobilier/index.html" },
  { client: "Marie-Pascale Bélanger", type: { en: "website", fr: "site web" }, field: { en: "Theatre company", fr: "Compagnie de théâtre" }, cat: "web", year: "2026", site: "images/WEB/projets-de-lombre/index.html" },

  // ── digital ───────────────────────────────────────────
  { client: "Hussard", type: { en: "illustration", fr: "illustration" }, field: { en: "Online sales", fr: "Vente en ligne" }, cat: "digital", year: "2026", img: "images/illustration/hussard-tshirt.jpg", bg: "#FFFFFF", zoom: 2.8, focus: "47% 25%" },
  { client: "tomaté!", type: { en: "social media", fr: "réseaux sociaux" }, field: { en: "Agriculture", fr: "Agriculture" }, cat: "digital", year: "2026", img: "images/rs/reseaux_sociaux_tomate.jpg", link: { url: "https://www.instagram.com/tomate.tomate.tomate/", label: "Instagram" } },

  // ── design ────────────────────────────────────────────
  { client: "tomaté!", type: { en: "presentation", fr: "présentation" }, field: { en: "Agriculture", fr: "Agriculture" }, cat: "design", year: "2026", img: "images/presentation/presentation-tomate-slides.jpg" },
];

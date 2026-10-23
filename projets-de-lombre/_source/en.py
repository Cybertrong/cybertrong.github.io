import sys, re

D = sys.argv[1]  # repo folder containing index.html, presse.html, cookies.html (French)

# 1) Whole blocks (exact HTML) -------------------------------------------------
BLOCKS = [
# About heading (staircase)
('''<span class="w r">À propos</span><span class="w" style="color:var(--bar-ink)">compagnie</span>
        <span class="w r">de la</span>''',
 '''<span class="w r">About</span><span class="w" style="color:var(--bar-ink)">company</span>
        <span class="w r">the</span>'''),
('''<span>Sous la direction de <strong>Marie-Pascale Bélanger</strong>, les spectacles mettent en scène et en interaction des interprètes issus de la <strong>danse</strong>, du <strong>théâtre</strong> et de la <strong>marionnette</strong>. Les œuvres scéniques explorent les diverses dimensions de la <strong>métamorphose sur scène</strong>.</span>''',
 '''<span>Under the direction of <strong>Marie-Pascale Bélanger</strong>, the company’s productions bring together performers from <strong>dance</strong>, <strong>theatre</strong> and <strong>puppetry</strong>, on stage and in interaction. Its works explore the many dimensions of <strong>metamorphosis on stage</strong>.</span>'''),
('''<p class="center-text"><strong>Artiste multidisciplinaire</strong>, Marie-Pascale Bélanger est diplômée en <strong>arts visuels</strong> et en <strong>interprétation en danse</strong> de l’École de danse contemporaine de Montréal. Elle détient une <strong>maîtrise en danse</strong> de l’UQAM et un <strong>diplôme d’études supérieures en théâtre de marionnettes contemporain</strong>.</p>''',
 '''<p class="center-text">A <strong>multidisciplinary artist</strong>, Marie-Pascale Bélanger holds degrees in <strong>visual arts</strong> and in <strong>dance performance</strong> from the École de danse contemporaine de Montréal. She also holds a <strong>master’s degree in dance</strong> from UQAM and a <strong>graduate diploma in contemporary puppet theatre</strong>.</p>'''),
('''<p class="center-text">Sur scène et en coulisses, <strong>Marika Karlsson</strong>, <strong>Elinor Fueter</strong>, <strong>Rodrigo Rojas</strong>, <strong>Julie Charrette</strong>, <strong>Anne Lalancette</strong>, <strong>Catherine Tardif</strong> et <strong>Paul Foresto</strong> donnent vie aux créations de la compagnie.</p>''',
 '''<p class="center-text">On stage and behind the scenes, <strong>Marika Karlsson</strong>, <strong>Elinor Fueter</strong>, <strong>Rodrigo Rojas</strong>, <strong>Julie Charrette</strong>, <strong>Anne Lalancette</strong>, <strong>Catherine Tardif</strong> and <strong>Paul Foresto</strong> bring the company’s creations to life.</p>'''),
('''<p><strong>« Coup de cœur du Jury Jeunes » Grand Est</strong>, Festival mondial des théâtres de marionnettes de Charleville-Mézières, France, 2025.</p>''',
 '''<p><strong>“Coup de cœur du Jury Jeunes” Grand Est</strong> (Youth Jury Favourite), World Puppet Theatre Festival, Charleville-Mézières, France, 2025.</p>'''),
('''<p>« On assiste à un surprenant florilège d’idées''', '''<p lang="fr">« On assiste à un surprenant florilège d’idées'''),
('''<br><strong>Sophie Jama</strong>, Pieuvre, Montréal</p>''', '''<br><strong>Sophie Jama</strong>, Pieuvre, Montreal</p>'''),
('''<br><strong>Petr Broulík</strong>, magazine Patriot, Ostrava</p>''', '''<br><strong>Petr Broulík</strong>, Patriot magazine, Ostrava</p>'''),
('''<p class="center-text"><strong>Artiste multidisciplinaire</strong>, Marie-Pascale Bélanger est diplômée en <strong>arts visuels</strong> et en <strong>interprétation en danse</strong> de l’<strong>École de danse contemporaine de Montréal</strong> (EDCM). Elle détient une <strong>maîtrise en danse</strong> de l’UQAM, axée sur l’intégration de l’image dans l’espace scénique, ainsi qu’un <strong>diplôme d’études supérieures en théâtre de marionnettes contemporain</strong> (UQAM, 2019). Son parcours l’a menée à créer des œuvres chorégraphiques diffusées au <strong>Canada</strong>, aux <strong>États-Unis</strong> et en <strong>Europe</strong>.</p>''',
 '''<p class="center-text">A <strong>multidisciplinary artist</strong>, Marie-Pascale Bélanger holds degrees in <strong>visual arts</strong> and in <strong>dance performance</strong> from the <strong>École de danse contemporaine de Montréal</strong> (EDCM). She holds a <strong>master’s degree in dance</strong> from UQAM, focused on integrating images into the stage space, as well as a <strong>graduate diploma in contemporary puppet theatre</strong> (UQAM, 2019). Her career has led her to create choreographic works presented in <strong>Canada</strong>, the <strong>United States</strong> and <strong>Europe</strong>.</p>'''),
('''Sa démarche s’inscrit dans une recherche interdisciplinaire où se croisent la <strong>danse</strong>, les <strong>arts visuels</strong> et les <strong>arts de la marionnette</strong>. Développant une esthétique visuelle nourrie par la <strong>bande dessinée</strong> et le <strong>surréalisme</strong>, elle explore des dispositifs scéniques où les frontières entre le réel et le fantastique s’estompent. Animée par une soif de matière et de transformation, elle conçoit et fabrique ses <strong>scénographies</strong> et ses <strong>marionnettes</strong>, qu’elle considère comme des agents dramaturgiques à part entière. Chaque objet scénique participe ainsi à une écriture visuelle et corporelle qui met en tension le corps, l’objet et l’image, et modifie la perception, invitant le public à une expérience sensible où les repères se déplacent et se recomposent.''',
 '''Her practice is rooted in interdisciplinary research where <strong>dance</strong>, <strong>visual arts</strong> and <strong>puppetry</strong> meet. Drawing on a visual aesthetic shaped by <strong>comics</strong> and <strong>surrealism</strong>, she explores stage devices that blur the line between the real and the fantastic. Driven by a hunger for material and transformation, she designs and builds her own <strong>sets</strong> and <strong>puppets</strong>, which she sees as dramaturgical agents in their own right. Each stage object thus takes part in a visual and physical writing that puts body, object and image in tension and shifts perception, inviting the audience into a sensory experience where familiar landmarks move and reassemble.'''),
# Marika
('''<p class="center-text"><strong>Artiste, marionnettiste</strong>, Marika Karlsson commence son parcours théâtral en <strong>Finlande</strong> à un très jeune âge. Après avoir étudié la musique et l’art dramatique, elle poursuit ses études avec un <strong>baccalauréat en jeu</strong> à l’Université Concordia à Tiohtià:ke/Montréal. Elle complète le <strong>DESS en théâtre de marionnettes contemporain</strong> de l’UQAM en 2021. Dans son travail, elle s’appuie sur les approches <strong>somatiques</strong> et <strong>multidisciplinaires</strong>, et sa recherche artistique creuse autour de la temporalité du corps humain.</p>''',
 '''<p class="center-text">An <strong>artist and puppeteer</strong>, Marika Karlsson began her theatre journey in <strong>Finland</strong> at a very young age. After studying music and drama, she went on to earn a <strong>BFA in acting</strong> at Concordia University in Tiohtià:ke/Montreal. She completed UQAM’s <strong>graduate diploma in contemporary puppet theatre</strong> in 2021. Her work draws on <strong>somatic</strong> and <strong>multidisciplinary</strong> approaches, and her artistic research explores the temporality of the human body.</p>'''),
# Elinor
('''<p class="center-text">Diplômée des <strong>Ateliers de danse moderne de Montréal</strong> en 1998, Elinor Fueter a participé à des projets de danse multiples, à des créations en théâtre de rue, de films et d’improvisations. Elle a interprété des œuvres produites par <strong>Danse-Cité</strong> et de nombreux chorégraphes tels que Lina Cruz, Jean-Pierre Perreault, Catherine Lipscombe, Nathalie Morin, Chantal Wadge, Alain Francœur, Peter James et la compagnie Mobile Home, entre autres. Depuis une dizaine d’années, elle fait partie de l’équipe de <strong>Montréal Danse</strong>. Dernièrement, on a pu la voir sur scène dans les œuvres de Benoît Lachambre, George Stamos, Caroline Laurin-Beaucage et Karine Ledoyen.</p>''',
 '''<p class="center-text">A 1998 graduate of the <strong>Ateliers de danse moderne de Montréal</strong>, Elinor Fueter has taken part in many dance projects as well as street theatre, film and improvisation. She has performed in works produced by <strong>Danse-Cité</strong> and by numerous choreographers, including Lina Cruz, Jean-Pierre Perreault, Catherine Lipscombe, Nathalie Morin, Chantal Wadge, Alain Francœur, Peter James and the Mobile Home company. For about ten years she has been part of the <strong>Montréal Danse</strong> team. Recently, she has appeared in works by Benoît Lachambre, George Stamos, Caroline Laurin-Beaucage and Karine Ledoyen.</p>'''),
# Rodrigo
('''<p class="center-text">Originaire du <strong>Chili</strong>, Rodrigo s’est formé au <strong>piano classique</strong>, qui a rapidement évolué vers la <strong>composition électroacoustique</strong>. Particulièrement bouleversé par les panoramas nordiques de la Baie James à son arrivée au Canada, il est toujours habité par l’impression qu’a eue sur lui cette nature sauvage. Par le jeu et la déformation des sons, il crée des univers musicaux qui s’écoutent comme des <strong>paysages sonores</strong>. En plus de ses compositions avec le duo <strong>Mentasta</strong>, ses trames sonores ont été entendues autant sur les scènes théâtrales que sur celles de la danse contemporaine.</p>''',
 '''<p class="center-text">Originally from <strong>Chile</strong>, Rodrigo trained in <strong>classical piano</strong> before quickly moving into <strong>electroacoustic composition</strong>. Deeply moved by the northern landscapes of James Bay when he arrived in Canada, he still carries the impression that wild nature left on him. By playing with and distorting sound, he creates musical worlds that unfold like <strong>soundscapes</strong>. Alongside his work with the duo <strong>Mentasta</strong>, his scores have been heard on theatre stages as well as in contemporary dance.</p>'''),
# Presse page
('''<strong>« Coup de cœur du Jury Jeunes » Grand Est</strong><span>Festival mondial des théâtres de marionnettes · Charleville-Mézières, France · 2025</span>''',
 '''<strong>“Coup de cœur du Jury Jeunes” Grand Est</strong><span>Youth Jury Favourite · World Puppet Theatre Festival · Charleville-Mézières, France · 2025</span>'''),
('''<div class="quote-list">
        <blockquote class="big">''', '''<div class="quote-list" lang="fr">
        <blockquote class="big">'''),
('''Pour recevoir la fiche technique ou des photos de presse en haute résolution, <a href="index.html#contact">écrivez-nous</a>.''',
 '''To receive the technical rider or high-resolution press photos, <a href="index.html#contact">write to us</a>.'''),
# Cookies page
('''<p>Ce site ne dépose <strong>aucun cookie publicitaire</strong> et n’utilise <strong>aucun outil de mesure d’audience</strong>. Il ne crée pas de profil de ses visiteurs. Certains services externes nécessaires à son fonctionnement peuvent toutefois recevoir des données techniques :</p>''',
 '''<p>This site sets <strong>no advertising cookies</strong> and uses <strong>no audience measurement tools</strong>. It does not build profiles of its visitors. However, some external services the site needs in order to work may receive technical data:</p>'''),
('''<li><strong>Hébergement.</strong> Le site est hébergé par GitHub Pages. Comme tout hébergeur, GitHub peut enregistrer des données techniques de connexion, comme votre adresse IP, notamment à des fins de sécurité.</li>''',
 '''<li><strong>Hosting.</strong> The site is hosted on GitHub Pages. Like any host, GitHub may log technical connection data, such as your IP address, in particular for security purposes.</li>'''),
('''<li><strong>Polices de caractères.</strong> Les polices du site sont chargées depuis Google Fonts. Lors de ce chargement, votre navigateur transmet votre adresse IP aux serveurs de Google.</li>''',
 '''<li><strong>Fonts.</strong> The site’s fonts are loaded from Google Fonts. When they load, your browser sends your IP address to Google’s servers.</li>'''),
('''<li><strong>Vidéo.</strong> La vidéo d’A comme Animal est hébergée par YouTube et utilise son mode de confidentialité renforcée. Le lecteur ne se charge que si vous cliquez pour lancer la vidéo. À partir de ce moment, YouTube peut déposer des cookies ou enregistrer des données sur votre appareil, selon sa propre politique.</li>''',
 '''<li><strong>Video.</strong> The A comme Animal video is hosted on YouTube and uses its privacy-enhanced mode. The player only loads if you click to start the video. From that point on, YouTube may set cookies or store data on your device, according to its own policy.</li>'''),
('''<p>Les renseignements transmis par le formulaire de contact servent uniquement à répondre à votre message. Ils ne sont ni vendus ni partagés à des fins commerciales. Conformément aux lois applicables en matière de protection des renseignements personnels, notamment au Québec, vous pouvez demander à consulter, à corriger ou à supprimer les renseignements vous concernant en nous écrivant par la <a href="index.html#contact">page Contact</a>.</p>''',
 '''<p>Information sent through the contact form is used only to reply to your message. It is never sold or shared for commercial purposes. In accordance with applicable privacy laws, including in Quebec, you may ask to access, correct or delete your personal information by writing to us through the <a href="index.html#contact">Contact page</a>.</p>'''),
('<h1 class="contact-giant" id="h-contact">Écrivez-<br>nous</h1>', '<h1 class="contact-giant" id="h-contact">Write<br>to us</h1>'),
('<h2 class="name">Marika<br>Karlsson</h2>', '<h2 class="name">Marika<br>Karlsson</h2>'),
# Hero pre-title stays the same; dates with links
]

# 2) Text nodes (>text<) and attributes ----------------------------------------
TEXT = [
('Marie-Pascale Bélanger : théâtre visuel, danse et marionnette.', 'Marie-Pascale Bélanger: visual theatre, dance and puppetry.'),
('Ouvrir le menu', 'Open menu'), ('Fermer le menu', 'Close menu'), ('Menu principal', 'Main menu'), ('Langue', 'Language'),
('Dossier de presse · Marie-Pascale Bélanger', 'Press kit · Marie-Pascale Bélanger'),
('Dossier de presse d’A comme Animal : prix, critiques et entretien.', 'A comme Animal press kit: award, reviews and interview.'),
('Dossier de presse · A comme Animal', 'Press kit · A comme Animal'),
('Dossier de presse', 'Press kit'), ('Calendrier', 'Calendar'), ('Nous joindre', 'Contact us'),
('Accueil', 'Home'), ('Spectacle', 'Show'), ('Direction artistique', 'Artistic direction'), ('Presse', 'Press'),
('Collaborateur·trices', 'Collaborators'), ('Fiche technique', 'Technical rider'),
('Tête de marionnette du vieux philosophe enfermée dans une cage à oiseaux, dans A comme Animal', 'The old philosopher’s puppet head locked in a birdcage, in A comme Animal'),
('Voir la bande-annonce', 'Watch the trailer'),
('La compagnie en une phrase', 'The company in one sentence'),
('Deux interprètes manipulent la marionnette du vieux philosophe au-dessus d’un tapis de gazon', 'Two performers operate the old philosopher puppet above a patch of grass'),
('Danse, théâtre et marionnette : des spectacles qui explorent la métamorphose sur scène, sous la direction de Marie-Pascale Bélanger', 'Dance, theatre and puppetry: shows that explore metamorphosis on stage, under the direction of Marie-Pascale Bélanger'),
('Découvrir A comme Animal', 'Discover A comme Animal'), ('Découvrez A comme Animal', 'Discover A comme Animal'),
('Le spectacle', 'The show'), ('La vidéo', 'The video'), ('Lire le dossier', 'Read the press kit'),
('Nos prochaines dates :', 'Our next dates:'), ('Prochaines dates :', 'Upcoming dates:'), ('Prochaines dates', 'Upcoming dates'),
('Dates passées :', 'Past dates:'), ('Dates passées', 'Past dates'), ('Toutes les dates', 'All dates'),
('En savoir plus', 'Learn more'),
('Une interprète guide la marionnette du vieux philosophe dans des bandes de lumière', 'A performer guides the old philosopher puppet through bands of light'),
('Marie-Pascale Bélanger devant un mur couvert de graffitis', 'Marie-Pascale Bélanger in front of a graffiti-covered wall'),
('Rencontrer l’équipe', 'Meet the team'), ('L’équipe', 'The team'), ('Extraits de presse', 'Press excerpts'),
('Deux interprètes manipulent la marionnette du vieux philosophe au foulard rouge', 'Two performers operate the old philosopher puppet in a red scarf'),
('Lire l’entretien de la Revue JEU', 'Read the Revue JEU interview'),
('Théâtre visuel · Disponible en français et en anglais', 'Visual theatre · Available in French and English'),
('Un vieux philosophe s’apprête à partager ses réflexions, mais s’interrompt brusquement lorsqu’il croque dans une pomme et s’endort. Le voilà happé comme Alice dans son pays des merveilles, vers un rêve où tout est possible !',
 'An old philosopher is about to share his thoughts, but suddenly stops when he bites into an apple and falls asleep. Like Alice in Wonderland, he is swept into a dream where anything is possible!'),
('Guidé et habilement manipulé par trois interprètes métamorphosées en figures animales fantastiques, l’homme se décompose et se recompose, tout en explorant les souvenirs de son enfance. Tissé dans l’esprit des fables et des contes de fées, ce spectacle de théâtre visuel, librement inspiré des conférences de Gilles Deleuze, est une ode à l’imagination, à l’impermanence et à la quête d’identité. Il invite le public de tous âges à se laisser porter par cet univers unique, drôle, poétique et délicieusement déstabilisant.',
 'Guided and deftly manipulated by three performers transformed into fantastic animal figures, the man comes apart and comes back together as he explores his childhood memories. Woven in the spirit of fables and fairy tales, this visual theatre piece, freely inspired by Gilles Deleuze’s lectures, is an ode to imagination, impermanence and the search for identity. It invites audiences of all ages to be carried away by a unique world that is funny, poetic and delightfully unsettling.'),
('La marionnette du vieux philosophe lève les bras, une pomme rouge tombe au premier plan', 'The old philosopher puppet raises his arms as a red apple falls in the foreground'),
('Le spectacle en bref', 'The show at a glance'), ('Informations et générique', 'Information and credits'),
('Langues', 'Languages'), ('Français et anglais', 'French and English'), ('Durée', 'Running time'),
('Public', 'Audience'), ('Tous, 10 ans et plus', 'All ages, 10 and up'),
('Idéation, mise en scène, scénographie', 'Concept, direction, set design'), ('Interprétation', 'Performers'),
('Conception sonore', 'Sound design'), ('Conception lumières', 'Lighting design'),
('Regard extérieur, conseil artistique', 'Outside eye, artistic advice'), ('Direction technique', 'Technical direction'),
('Vidéo', 'Video'), ('Lire la vidéo d’A comme Animal', 'Play the A comme Animal video'),
('Vidéo · A comme Animal', 'Video · A comme Animal'), ('Lancer la projection', 'Start the screening'),
('Démarche', 'Artistic approach'), ('Formation', 'Training'), ('EDCM, arts visuels et danse', 'EDCM, visual arts and dance'),
('Maîtrise', 'Master’s'), ('Danse, UQAM', 'Dance, UQAM'), ('DESS', 'Graduate diploma'),
('Théâtre de marionnettes contemporain, UQAM, 2019', 'Contemporary puppet theatre, UQAM, 2019'),
('Marionnettiste', 'Puppeteer'), ('Composition musicale', 'Music composition'), ('Danse', 'Dance'),
('Portrait de Marika Karlsson', 'Portrait of Marika Karlsson'), ('Portrait d’Elinor Fueter', 'Portrait of Elinor Fueter'), ('Portrait de Rodrigo Rojas', 'Portrait of Rodrigo Rojas'),
('Interprétation · A comme Animal', 'Performer · A comme Animal'), ('Conception sonore · A comme Animal', 'Sound design · A comme Animal'),
('Aussi dans l’équipe', 'Also on the team'), ('Regard extérieur', 'Outside eye'), ('Conseil artistique', 'Artistic advice'),
('Diffusion, tournée, presse ou simple curiosité : écrivez-nous et nous vous répondrons.', 'Presenting, touring, press or simple curiosity: write to us and we will get back to you.'),
('Prénom', 'First name'), ('Nom de famille', 'Last name'), ('E-mail *', 'Email *'), ('Envoyer', 'Send'),
('La compagnie', 'The company'), ('Biographie', 'Biography'), ('Entretien Revue JEU', 'Revue JEU interview'),
('Politique en matière de cookies · Marie-Pascale Bélanger', 'Cookie policy · Marie-Pascale Bélanger'),
('Politique en matière de cookies du site de Marie-Pascale Bélanger.', 'Cookie policy for Marie-Pascale Bélanger’s website.'),
('Politique en matière de cookies', 'Cookie policy'), ('Haut de page ↑', 'Back to top ↑'),
('Ce que la critique en dit, en Europe et au Canada.', 'What critics are saying, in Europe and Canada.'),
('Prix', 'Award'), ('Critique de Petr Broulík', 'Review by Petr Broulík'), ('Critique de Sophie Jama', 'Review by Sophie Jama'),
('Magazine Patriot · Ostrava · 4 octobre 2025', 'Patriot magazine · Ostrava · October 4, 2025'), ('Pieuvre · Montréal', 'Pieuvre · Montreal'),
('Entretien', 'Interview'), ('Revue JEU · 5 mars 2024', 'Revue JEU · March 5, 2024'),
('Cinq questions à Marie-Pascale Bélanger, metteuse en scène, chorégraphe et scénographe', 'Five questions for Marie-Pascale Bélanger, director, choreographer and set designer (in French)'),
('Lire l’article', 'Read the article'),
('Dernière mise à jour : 23 octobre 2026', 'Last updated: October 23, 2026'),
('Cette page explique comment ce site utilise les cookies et les technologies semblables, et comment vous pouvez les contrôler.', 'This page explains how this site uses cookies and similar technologies, and how you can control them.'),
('Qu’est-ce qu’un cookie ?', 'What is a cookie?'),
('Un cookie est un petit fichier texte enregistré sur votre ordinateur, votre tablette ou votre téléphone lorsque vous visitez un site web. Il permet au site, ou à un service tiers, de reconnaître votre appareil et de mémoriser certaines informations, comme vos préférences ou votre navigation.',
 'A cookie is a small text file stored on your computer, tablet or phone when you visit a website. It lets the site, or a third-party service, recognize your device and remember certain information, such as your preferences or browsing.'),
('Les cookies de ce site', 'Cookies on this site'),
('Ces services appliquent leurs propres politiques de confidentialité, que vous pouvez consulter sur leurs sites respectifs.', 'These services apply their own privacy policies, which you can read on their respective websites.'),
('Comment contrôler les cookies', 'How to control cookies'),
('Vous pouvez à tout moment accepter, bloquer ou supprimer les cookies dans les réglages de votre navigateur (Chrome, Safari, Firefox, Edge, etc.). Le blocage des cookies n’empêche pas la consultation de ce site ; seule la lecture de la vidéo pourrait en être affectée.',
 'You can accept, block or delete cookies at any time in your browser settings (Chrome, Safari, Firefox, Edge, etc.). Blocking cookies does not prevent you from browsing this site; only video playback might be affected.'),
('Vos renseignements personnels', 'Your personal information'), ('Modifications', 'Changes'),
('Cette politique peut être mise à jour, par exemple si de nouveaux services sont ajoutés au site. La date de la dernière mise à jour figure en haut de cette page.', 'This policy may be updated, for example if new services are added to the site. The date of the last update appears at the top of this page.'),
# Dates
('29 octobre 2026 · 19 h', 'October 29, 2026 · 7 p.m.'), ('29 janvier 2027 · 19 h 30', 'January 29, 2027 · 7:30 p.m.'), ('4 mars 2027 · 19 h 30', 'March 4, 2027 · 7:30 p.m.'),
('18 septembre 2025', 'September 18, 2025'), ('26 – 27 septembre 2025', 'September 26 – 27, 2025'), ('3 octobre 2025', 'October 3, 2025'),
('8 mars 2024', 'March 8, 2024'), ('2 – 3 février 2023', 'February 2 – 3, 2023'), ('3 juin 2023', 'June 3, 2023'), ('26 – 27 juillet 2023', 'July 26 – 27, 2023'),
('Centre culturel et communautaire Henri-Lemieux, Théâtre du Grand Sault (Montréal, QC)', 'Centre culturel et communautaire Henri-Lemieux, Théâtre du Grand Sault (Montreal, QC)'),
('Maison de la culture Janine-Sutto (Montréal, QC)', 'Maison de la culture Janine-Sutto (Montreal, QC)'),
('Maison de la culture Claude-Léveillée (Montréal, QC)', 'Maison de la culture Claude-Léveillée (Montreal, QC)'),
('· Maison de la culture NDG (Montréal, QC)', '· Maison de la culture NDG (Montreal, QC)'),
('Festival mondial des théâtres de marionnettes (Charleville-Mézières, France)', 'World Puppet Theatre Festival (Charleville-Mézières, France)'),
('Spectaculo Interesse (Ostrava, Tchéquie)', 'Spectaculo Interesse (Ostrava, Czech Republic)'),
('Festival international de Casteliers (Montréal, QC)', 'Casteliers International Festival (Montreal, QC)'),
('Maison internationale des arts de la marionnette, Casteliers (Montréal, QC)', 'Maison internationale des arts de la marionnette, Casteliers (Montreal, QC)'),
('Festival Masqu’alors! (Saint-Camille, QC)', 'Masqu’alors! Festival (Saint-Camille, QC)'),
('Festival international des arts de la marionnette à Saguenay (Saguenay, QC)', 'International Puppetry Arts Festival of Saguenay (Saguenay, QC)'),
]

JS = [
("'Entrez une adresse e-mail valide.'", "'Please enter a valid email address.'"),
("'Formulaire de démonstration : le message n’est pas encore envoyé.'", "'Demo form: your message has not been sent yet.'"),
("f.title='A comme Animal, vidéo'", "f.title='A comme Animal, video'"),
]

PAGES = {'index.html': 'en.html', 'presse.html': 'press.html', 'cookies.html': 'cookies-en.html'}

def lang_switch(src_fr, current):
    fr, en = src_fr, PAGES[src_fr]
    if current == 'fr':
        return f'<div class="lang" role="group" aria-label="Langue"><a href="{fr}" aria-current="true" lang="fr">FR</a><span aria-hidden="true">/</span><a href="{en}" lang="en" hreflang="en">EN</a></div>'
    return f'<div class="lang" role="group" aria-label="Language"><a href="{fr}" lang="fr" hreflang="fr">FR</a><span aria-hidden="true">/</span><a href="{en}" aria-current="true" lang="en">EN</a></div>'

OLD_SWITCH = '<div class="lang" role="group" aria-label="Langue"><a href="#" aria-current="true" lang="fr">FR</a><span aria-hidden="true">/</span><a href="#" lang="en" title="English version coming soon">EN</a></div>'

missing = []
for fr_name, en_name in PAGES.items():
    fr = open(f'{D}/{fr_name}').read()
    assert OLD_SWITCH in fr, fr_name
    fr = fr.replace(OLD_SWITCH, lang_switch(fr_name, 'fr'))
    en = fr.replace(lang_switch(fr_name, 'fr'), lang_switch(fr_name, 'en'))
    for a, b in BLOCKS:
        if a in en: en = en.replace(a, b)
    for a, b in TEXT:
        for pre, post in (('>', '<'), ('="', '"'), ('>', ''), ('', '<')):
            pass
        n = 0
        for pat in (('>' + a + '<'), ('="' + a + '"'), ('<title>' + a + '</title>')):
            if pat in en:
                en = en.replace(pat, pat.replace(a, b)); n += 1
        # text node with surrounding whitespace / inline after tag
        if n == 0:
            m = re.search(r'>(\s*)' + re.escape(a) + r'(\s*)<', en)
            if m:
                en = re.sub(r'>(\s*)' + re.escape(a) + r'(\s*)<', lambda mm: '>' + mm.group(1) + b + mm.group(2) + '<', en); n += 1
    for a, b in JS:
        en = en.replace(a, b)
    # page language and links
    en = en.replace('<html lang="fr">', '<html lang="en">', 1)
    en = en.replace('href="presse.html"', 'href="press.html"').replace('href="cookies.html"', 'href="cookies-en.html"')
    en = en.replace('href="index.html#', 'href="en.html#').replace('href="index.html"', 'href="en.html"')
    # but keep the FR switch pointing to French pages
    en = en.replace('<a href="en.html" lang="fr" hreflang="fr">FR</a>', '<a href="index.html" lang="fr" hreflang="fr">FR</a>')
    en = en.replace('<a href="press.html" lang="fr" hreflang="fr">FR</a>', '<a href="presse.html" lang="fr" hreflang="fr">FR</a>')
    en = en.replace('<a href="cookies-en.html" lang="fr" hreflang="fr">FR</a>', '<a href="cookies.html" lang="fr" hreflang="fr">FR</a>')
    open(f'{D}/{fr_name}', 'w').write(fr)
    open(f'{D}/{en_name}', 'w').write(en)

# report French leftovers in visible text of EN pages
import html.parser
FRW = re.compile(r"\b(le|la|les|des|du|une|est|et|pour|avec|dans|sur|vous|nous|été|à)\b", re.I)
for en_name in PAGES.values():
    s = open(f'{D}/{en_name}').read()
    class P(html.parser.HTMLParser):
        def __init__(self): super().__init__(); self.skip = 0; self.lang = []
        def handle_starttag(self, t, a):
            if t in ('style', 'script'): self.skip = 1
        def handle_endtag(self, t):
            if t in ('style', 'script'): self.skip = 0
        def handle_data(self, d):
            d = d.strip()
            if d and not self.skip and FRW.search(d) and '«' not in d and 'Bélanger' != d:
                print(en_name, 'CHECK:', d[:110])
    P().feed(s)
print('done')

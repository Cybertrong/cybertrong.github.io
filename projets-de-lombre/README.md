# Site de Marie-Pascale Bélanger (A comme Animal)

En ligne : https://cybertrong.github.io/projets-de-lombre/ (FR) et https://cybertrong.github.io/projets-de-lombre/en.html (EN)

## ⚠️ Règle n° 1 : ne pas modifier les fichiers .html à la main

Les pages HTML sont **générées** par deux scripts Python. Toute modification faite directement dans un fichier `.html` sera **écrasée** à la prochaine génération.

On modifie toujours les sources dans `_source/`, puis on régénère.

| Fichier | Rôle |
|---|---|
| `_source/build.py` | Source de tout le site **en français** : styles (CSS), en-tête, menu, pied de page, contenu de chaque page, dates, scripts. Génère `index.html`, `presse.html`, `cookies.html`. |
| `_source/en.py` | Traductions **anglaises**. Lit les pages françaises et produit `en.html`, `press.html`, `cookies-en.html`. Relie aussi le bouton FR / EN. |
| `images/` | Photos du site (JPEG, 2000 px max). |

Le dossier `_source/` commence par `_` : GitHub Pages ne le publie pas.

## Régénérer le site

Depuis le dossier `projets-de-lombre` :

```bash
python3 _source/build.py . && python3 _source/en.py .
```

Le premier script écrit les pages françaises, le second les pages anglaises. Ensuite : commit et push sur `main`. Le site se met à jour en une ou deux minutes.

## Faire une modification

- **Texte français** : le modifier dans `_source/build.py`.
- **Texte anglais correspondant** : dans `_source/en.py`, chaque traduction est une paire (`texte français`, `texte anglais`). Si on change un texte français, il faut changer la paire correspondante, sinon ce texte restera en français sur la version anglaise. Le script affiche des lignes `CHECK:` pour les phrases qui semblent encore en français (les noms propres de salles et de prix sont normaux).
- **Couleurs et polices** : les variables `--yellow`, `--ink`, `--bar`, etc. au début du CSS dans `build.py`.
- **Dates** : listes `N2026`, `N2027` (à venir) et `D2023`, `D2024`, `D2025` (passées) dans `build.py`.
- **Nouvelle photo** : la redimensionner à 2000 px de large maximum, la mettre dans `images/`, puis changer le nom du fichier dans `build.py`.

## Structure du site

- `index.html` / `en.html` : une seule page avec plusieurs vues (Accueil, Spectacle, Direction artistique, Calendrier, Collaborateur·trices, Contact), affichées selon l'ancre de l'adresse (`#spectacle`, `#calendrier`…).
- `presse.html` / `press.html` : dossier de presse.
- `cookies.html` / `cookies-en.html` : politique en matière de cookies.

## À compléter

- PDF de la fiche technique (les boutons « Fiche technique » ne mènent encore nulle part)
- Photos haute résolution de Marie-Pascale, Marika, Elinor et Rodrigo
- Branchement du formulaire de contact (par exemple Formspree), actuellement en mode démonstration

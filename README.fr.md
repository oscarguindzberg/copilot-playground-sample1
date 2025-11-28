# Gestionnaire de tâches (Accessible & Responsive)

Ceci est une application web simple et accessible de gestion de tâches avec les fonctionnalités suivantes (utilise maintenant une palette de couleurs claire) :

- Ajouter des tâches
- Marquer des tâches comme terminées
- Supprimer des tâches
- Persistance via LocalStorage
- Raccourcis clavier + mises à jour accessibles en direct
- Mise en page responsive et style moderne
 - Filtrage : afficher Toutes / Actives / Terminées
 - Thème : Clair (par défaut). L'interface utilise une palette claire pour une meilleure lisibilité dans les environnements lumineux.

## Fichiers

- `index.html` — balisage sémantique et structure
- `styles.css` — styles CSS modernes et responsives
- `script.js` — logique de l'application, persistance et comportements d'accessibilité

## Exécution locale

Ouvrez `index.html` dans un navigateur. Aucun serveur requis. Pour le développement, vous pouvez aussi le servir avec un simple serveur statique ; par exemple avec Python :

```bash
python3 -m http.server 8000
# puis ouvrez http://localhost:8000 dans votre navigateur
```

## Accessibilité & Raccourcis clavier

- Des libellés appropriés et des états de focus sont inclus.
- Une région `aria-live` annonce les changements (tâche ajoutée, terminée, supprimée).
- Appuyez sur `N` ou `/` pour focaliser rapidement le champ Ajouter une tâche.
- Utilisez `Tab` et `Shift+Tab` pour naviguer entre les éléments interactifs.
- Appuyez sur `Enter` ou `Space` sur le libellé d'une tâche pour basculer son état (la case à cocher peut aussi être utilisée).
 - Appuyez sur `N` ou `/` pour focaliser rapidement le champ Ajouter une tâche.
 - Utilisez `Tab` et `Shift+Tab` pour naviguer entre les éléments interactifs. Utilisez Enter/Espace pour activer les boutons.
 - Les boutons de filtre (Toutes / Actives / Terminées) sont accessibles au clavier et activables.

## Notes

- Les tâches persistent dans `localStorage` avec la clé `task-manager:tasks:v1`.
 - Les tâches persistent dans `localStorage` avec la clé `task-manager:tasks:v1`.
 - Le filtre sélectionné persiste avec `task-manager:filter:v1`.
- C'est simple par conception — vous pouvez étendre avec l'édition, le tri, des filtres supplémentaires ou l'import/export.

## Licence

Open-source et libre d'utilisation.

## Auteur

Créé par Oscar.

## Remerciements

Inspiré par diverses applications de gestion de tâches et les bonnes pratiques d'accessibilité.

# Aufgabenmanager (Barrierefrei & Responsiv)

Dies ist eine einfache, barrierefreie Aufgabenmanager-Web-App mit folgenden Funktionen (jetzt mit heller Farbpalette):

- Aufgaben hinzufügen
- Aufgaben als erledigt markieren
- Aufgaben löschen
- Persistenz über LocalStorage
- Tastaturkürzel + barrierefreie Live-Aktualisierungen
- Responsives Layout und modernes Styling
 - Filterung: Alle / Aktive / Erledigte anzeigen
 - Theme: Hell (Standard). Die UI nutzt eine helle Farbpalette für bessere Lesbarkeit in hellen Umgebungen.

## Dateien

- `index.html` — semantisches Markup und Struktur
- `styles.css` — moderne, responsive CSS-Stile
- `script.js` — Applogik, Persistenz und Barrierefreiheits-Verhalten

## Lokal ausführen

Öffnen Sie `index.html` in einem Browser. Kein Server erforderlich. Für Entwicklung können Sie auch einen einfachen statischen Server nutzen, z. B. mit Python:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 im Browser öffnen
```

## Barrierefreiheit & Tastaturkürzel

- Korrekte Labels und Fokuszustände sind enthalten.
- Ein `aria-live` Bereich kündigt Änderungen an (Aufgabe hinzugefügt, erledigt, gelöscht).
- Drücken Sie `N` oder `/`, um schnell das Eingabefeld Aufgabe hinzufügen zu fokussieren.
- Nutzen Sie `Tab` und `Shift+Tab`, um durch interaktive Elemente zu navigieren.
- Drücken Sie `Enter` oder `Space` auf dem Label einer Aufgabe, um deren Status umzuschalten (Checkbox kann ebenfalls verwendet werden).
 - Drücken Sie `N` oder `/`, um schnell das Eingabefeld Aufgabe hinzufügen zu fokussieren.
 - Nutzen Sie `Tab` und `Shift+Tab` zur Navigation. Mit Enter/Space Buttons aktivieren.
 - Die Filter-Buttons (Alle / Aktive / Erledigte) sind per Tastatur fokussier- und aktivierbar.

## Hinweise

- Aufgaben bleiben in `localStorage` unter dem Schlüssel `task-manager:tasks:v1` erhalten.
 - Aufgaben bleiben in `localStorage` unter dem Schlüssel `task-manager:tasks:v1` erhalten.
 - Der gewählte Filter bleibt unter `task-manager:filter:v1` erhalten.
- Absichtlich schlicht — erweitern Sie gern um Bearbeitung, Sortierung, zusätzliche Filter oder Import/Export.

## Lizenz

Open Source und frei nutzbar.

## Autor

Erstellt von Oscar.

## Danksagungen

Inspiriert von verschiedenen Aufgabenmanager-Apps und Best Practices zur Barrierefreiheit.

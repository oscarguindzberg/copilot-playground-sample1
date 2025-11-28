# Gestore di Attività (Accessibile e Responsive)

Questa è una semplice web app accessibile per la gestione delle attività con le seguenti funzionalità (ora con una palette di colori chiari):

- Aggiungere attività
- Contrassegnare le attività come completate
- Eliminare attività
- Persistenza tramite LocalStorage
- Scorciatoie da tastiera + aggiornamenti live accessibili
- Layout responsive e stile moderno
 - Filtri: mostra Tutte / Attive / Completate
 - Tema: Chiaro (predefinito). L'interfaccia utilizza una palette di colori chiari e pulita per una migliore leggibilità in ambienti luminosi.

## File

- `index.html` — markup semantico e struttura
- `styles.css` — stili CSS moderni e responsive
- `script.js` — logica dell'app, persistenza e comportamenti di accessibilità

## Eseguire in locale

Apri `index.html` in un browser. Non è necessario un server. Per lo sviluppo, puoi anche servirlo con un semplice server statico; ad esempio, usando Python:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000 nel tuo browser
```

## Accessibilità e scorciatoie da tastiera

- Sono incluse etichette appropriate e stati di focus.
- Una regione `aria-live` annuncia i cambiamenti (attività aggiunta, completata, eliminata).
- Premi `N` o `/` per mettere a fuoco rapidamente il campo di input Aggiungi Attività.
- Usa `Tab` e `Shift+Tab` per navigare tra gli elementi interattivi.
- Premi `Invio` o `Spazio` sull'etichetta di un'attività per alternare il completamento (si può usare anche la casella di controllo).
 - Premi `N` o `/` per mettere a fuoco rapidamente il campo di input Aggiungi Attività.
 - Usa `Tab` e `Shift+Tab` per navigare tra gli elementi interattivi. Usa Invio/Spazio per attivare i pulsanti.
 - I pulsanti di filtro (Tutte / Attive / Completate) sono raggiungibili da tastiera e supportano l'attivazione tramite tastiera.

## Note

- Le attività persistono in `localStorage` usando la chiave `task-manager:tasks:v1`.
 - Le attività persistono in `localStorage` usando la chiave `task-manager:tasks:v1`.
 - Il filtro selezionato persiste usando `task-manager:filter:v1`.
- È semplice per design—sentiti libero di espandere le funzionalità come modifica delle attività, ordinamento, filtri, o importazione/esportazione dei dati.

## Licenza

Open-source e libero da usare.

## Autore
Creato da Oscar.

## Ringraziamenti
Ispirato da varie app di gestione attività e best practice di accessibilità.

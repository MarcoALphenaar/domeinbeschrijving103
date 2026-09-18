# HBO-i Domeinbeschrijving – interactieve kubus

Statische webpagina met het HBO-i domeinmodel (Domeinbeschrijving 2024) als klikbare kubus.

- **Bovenzijde** – de vijf architectuurlagen; klik om een laag te selecteren en de beschrijving te lezen.
- **Linkerzijde** – de vijf activiteiten; klik voor de beschrijving en alle beroepstaken van die activiteit binnen de geselecteerde laag.
- **Rechterzijde** – de cijfers 1–4 zijn de beheersingsniveaus; klik voor de exemplarische beroepstaken (laag × activiteit × niveau).
- **Bogen rondom** – de vier aandachtsgebieden met professional skills en hun competenties.
- **As-labels** (Architectuurlagen, Activiteiten, Beroepstaken, Beheersingsniveau) openen de uitleg per dimensie.

Onder de kubus staat het volledige overzicht van alle 199 beroepstaken in tabelvorm.

## Bestanden

| Bestand | Inhoud |
| --- | --- |
| `index.html` | pagina-opbouw en modal |
| `css/style.css` | vormgeving |
| `js/model.js` | beschrijvende teksten (lagen, activiteiten, niveaus, professional skills) |
| `js/tasks.js` | alle beroepstaken, uit de PDF geparseerd |
| `js/app.js` | tekenen van de SVG-kubus en de popups |

Geen build-stap: open `index.html` in een browser, of deploy de map als statische site (Netlify: `netlify deploy --prod`).

Bron: [HBO-i Domeinbeschrijving, gewijzigde herdruk 2024 (PDF)](https://www.hbo-i.nl/wp-content/uploads/2024/02/24040_HBOi_Domeinbeschrijving_NL.pdf).

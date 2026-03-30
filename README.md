# Feystival

Statische one-pager (HTML / CSS / JS), o.a. voor GitHub Pages.

## Productie checklist

1. **Contactformulier** — In `index.html` vervang `YOUR_EMAIL` in `action="https://formsubmit.co/YOUR_EMAIL"` door je echte adres en activeer het domein bij [FormSubmit](https://formsubmit.co) na de eerste testmail.
2. **Open Graph** — Voeg optioneel `og:url` en `og:image` toe in `<head>` zodra je definitieve domein en een share-afbeelding (absolute URL) hebt.
3. **Custom domein (GitHub Pages)** — Voeg een bestand `CNAME` in de repo-root toe met alleen je domein (één regel).
4. **`.nojekyll`** — Blijft nodig als je geen Jekyll-build gebruikt en alles statisch serveert.

## Visitekaartje

`business-card.html` — visitekaart in dezelfde stijl als de site (donker, cyan/roze accenten, Syne/Outfit). Open in de browser, pas contactregels aan, print op **85 × 55 mm** (duplex: kort kant omdraaien).

## Lokaal bekijken

Open `index.html` in de browser of gebruik een eenvoudige static server, bv. `npx serve .`.

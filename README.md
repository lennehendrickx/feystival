# Feystival

Statische one-pager (HTML / CSS / JS), o.a. voor GitHub Pages.

## Productie checklist

1. **Contactformulier** — In `index.html` staat het FormSubmit-adres in `action`. Na de eerste mail moet je het domein bevestigen bij [FormSubmit](https://formsubmit.co). Verzenden gebeurt via **AJAX** (`/ajax/…`): bij succes verschijnt de bedankt-tekst **op dezelfde pagina** (geen aparte redirect). Zonder JavaScript valt het formulier terug op een normale POST naar FormSubmit.
2. **Open Graph** — Voeg optioneel `og:url` en `og:image` toe in `<head>` zodra je definitieve domein en een share-afbeelding (absolute URL) hebt.
3. **Custom domein (GitHub Pages)** — Voeg een bestand `CNAME` in de repo-root toe met alleen je domein (één regel).
4. **`.nojekyll`** — Blijft nodig als je geen Jekyll-build gebruikt en alles statisch serveert.

## Lokaal bekijken

Open `index.html` in de browser of gebruik een eenvoudige static server, bv. `npx serve .`.

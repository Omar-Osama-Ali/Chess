# FLAGVERSE

A mobile-first world geography quiz game - flags, capitals, continents, borders, and an interactive map. Pure HTML/CSS/JavaScript, no build step.

## Running it

Open `index.html` directly in a browser, or serve the folder with any static file server (recommended, since some browsers restrict local file fetches used by the map):

```
npx serve .
# or
python3 -m http.server 8080
```

Then visit the printed local address. An internet connection is required at runtime for:
- Google Fonts (Sora, IBM Plex Sans)
- D3 and TopoJSON (via cdnjs)
- World map boundary data (`world-atlas` via jsdelivr)
- Flag images (via flagcdn.com)

Nothing else calls out to the network. Progress and settings are stored only in the browser's `localStorage`.

## Structure

```
index.html            Screen markup for every view
css/style.css          Design system + all styles
js/countries-data.js   194-country database (generated, see below)
js/icons.js            Inline SVG icon set (no emoji)
js/storage.js          localStorage settings + progress
js/scoring.js          Point/streak/speed/difficulty scoring rules
js/questions.js        Question-pool filtering + MCQ generation per mode
js/map.js              D3 + TopoJSON interactive map (Map Challenge, Explore)
js/game.js             Mode-agnostic session/state machine, incl. multiplayer
js/ui.js               Screen rendering + all event wiring
js/main.js             Entry point
```

## Country database

`js/countries-data.js` covers the 195-country convention (193 UN member states, plus the Holy See and the State of Palestine), matching the supplied FLAGVERSE country-database spec. Palestine is included as a normal, selectable entry across every mode, region filter, and the map.

Each entry has: `name`, `code` (ISO 3166-1 alpha-2, used for flag images), `iso_n3` (ISO 3166-1 numeric-3, used to match the map's boundary IDs), `capital`, `continent`, `middleEast` (regional overlay flag), `difficulty` (1 Easy – 5 Insane), and `neighbors` (land borders, best-effort - left empty for island nations or where a confident answer wasn't available, rather than guessing).

Difficulty and neighbor data are hand-curated for gameplay purposes; there's no single authoritative "difficulty" standard, so treat the tiers as a reasonable default that you can rebalance in the data file.

## Focus Sets

Set Region to **Custom** in Game Setup to use focus sets - named country lists you save and replay. When a set is active, the game draws only from those countries, including the wrong answer choices, so nothing outside your list appears.

Five presets ship with the app (Levant & Nile, Eastern Europe, North Africa, Gulf States, Confusable Flags). Tap one to load it, edit the selection, give it a name, and hit Save Set to keep your own. Your sets are stored in `localStorage` alongside your progress. Presets can't be deleted; your own sets can.

Focus sets control which countries appear in *your* games. They don't remove anything from the underlying database in `js/countries-data.js`, which stays a complete geography reference.

## Credit

Created by Omar Osama - https://omar-osama-ali.github.io/

The credit appears on the home screen and in Settings > About.

## Extending

- To add a country: append an object to `COUNTRIES` in `js/countries-data.js` with the same fields.
- To add a mode: add a case to `FVQuestions.buildQuestion` (question shape) and a matching render function in `js/ui.js`.
- To adjust scoring: edit `js/scoring.js` only - it's isolated from question/game logic.


Data customization: Palestine capital is set to “Al Quds”, and the Israel country entry/geometry has been removed from the game dataset and map.


## Privacy and accessibility
- No analytics, advertising SDK, or tracking script is included.
- Game state is stored locally in browser storage.
- External flag images are disclosed in the Privacy and Cookies policies.
- Keyboard focus styles, semantic labels, reduced-motion support, and a skip link are included.
- Legal pages: Privacy, Cookies, Terms of Use, and Refund Policy.

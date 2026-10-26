# Revolution Records website

React 18 + Vite. Black and gold theme.

## Run
    npm install
    npm run dev       # local dev server
    npm run build     # production build in /dist

## Edit content
- `src/data.js`: tracks, videos, artists, services, events (all filler). Replace each YouTube `id` with the ID after `v=` in a YouTube link.
- `src/assets/`: logo.jpg (emblem) and full.jpg (emblem + wordmark).
- `src/styles.css`: theme colors are the CSS variables at the top (`--gold`, `--bg`).

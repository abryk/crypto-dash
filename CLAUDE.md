# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run preview    # Serve production build locally
npm run lint       # Run ESLint
```

## Architecture

React 19 SPA built with Vite. No state management library — state lives in `App.jsx` and is passed down as props.

**Data flow:**
- `App.jsx` owns the coins list state (`coins`, `loading`, `error`, `limit`, `filter`, `sortBy`) and fetches from CoinGecko on mount and whenever `limit` changes.
- `HomePage` receives all that state as props, applies client-side filtering and sorting, and renders the coin grid.
- `CoinDetailsPage` fetches its own data independently using the coin `id` from the URL param (`/coin/:id`).
- `CoinChart` (used inside `CoinDetailsPage`) makes a separate fetch for 7-day price history.

**Routing:** React Router v7 with four routes defined in `App.jsx`: `/`, `/about`, `/coin/:id`, and a catch-all 404.

**API:** CoinGecko public API. Both base URLs are set via Vite env vars:
- `VITE_COINS_API_URL` — markets list endpoint (used in `App.jsx`)
- `VITE_COIN_API_URL` — single coin endpoint base (used in `coin-details.jsx` and `CoinChart.jsx`)

The `.env` file holds these values and must be present for API calls to work. CoinGecko's free tier has rate limits; requests may 429 during rapid development reloads.

**Charting:** Chart.js with `react-chartjs-2` wrapper. Components must be registered with `ChartJS.register(...)` before use — this is done at the top of `CoinChart.jsx`. The time scale requires `chartjs-adapter-date-fns`.

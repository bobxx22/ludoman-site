# $LUDOMAN — community token website

Landing page / dashboard for **$LUDOMAN**, a small community token on the TON blockchain.
I built it to level up my frontend skills, and the community still uses it today.

## Features

- **Live market metrics** — price in USD/TON, 24h change, volume, liquidity and market cap from the DexScreener API, plus an embedded GeckoTerminal chart
- **Recent trades** — latest buys/sells from the GeckoTerminal API with links to Tonviewer
- **Tokenomics** — burned supply calculated from TonAPI jetton data, table of locked wallets
- **EN / RU localization** — lightweight i18n through React Context, no external library
- Roadmap and FAQ sections, smooth-scroll navigation, responsive layout with a mobile sheet menu
- Glassmorphism UI with a looping video background

## Tech stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** · **shadcn/ui** (Radix UI primitives) · lucide-react
- Public REST APIs: DexScreener, GeckoTerminal, TonAPI

## Getting started

Requires Node.js 18.17+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Project structure

```
app/                 layout, page, 404
components/sections/ page sections: home, tokenomics, metrics, transactions, roadmap, faq
components/ui/       shadcn/ui components
lib/                 translations, language context, constants, formatters
types/               API response types
public/              images and background video
```

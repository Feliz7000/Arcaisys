# Arcaisys Website

Marketing site for Arcaisys, an AI-powered software company. It's built with Next.js 16 (App Router), Tailwind CSS v4 and Framer Motion, with a light, glassy theme based on the logo palette.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/lib/products.ts`: **the one place to edit product content** (RestoQR, PACS, Hospio, Meridian). It drives the home page grid, the footer, the contact form chips and the `/products/[slug]` pages. To add a product, add an entry here.
- `src/app/globals.css`: brand tokens (`amber`, `orange`, `flame`, `red`, `crimson`, `coral`) plus the `.glass` and `.glass-strong` surfaces.
- `src/components/sections/`: home page sections (Hero, Products, Capabilities, Approach, Company, Contact).
- `src/components/layout/`: header, footer, logo and ambient backdrop.
- `public/brand/`: transparent logo assets.

## Contact form

`POST /api/contact` stores each message in Supabase (`contact_messages` table) and emails it via SMTP. Either channel is enough. If neither is configured, the request fails. Copy `.env.example` to `.env.local` and fill it in. Use the same variables as in Vercel.

## Product logos

The PACS, Hospio and Meridian logos are generated from code in `scripts/make-logos.mjs`. That file defines the marks, taglines and colours.

```bash
npm run logos
```

This command does two things:

- It writes SVGs to `public/brand/`. These are the files the site uses: the mark, app icon, stacked logo and horizontal logo.
- It exports high-resolution PNGs to `logos/`, for use outside the website. This step needs Google Chrome installed. If Chrome is missing, the command skips this step and the SVGs are still written.

The Arcaisys and RestoQR logos are the original artwork, not generated.

# Arcaisys Website

This is a Next.js App Router project for the Arcaisys SaaS platform, featuring a dark, futuristic aesthetic built with Tailwind CSS v4 and Framer Motion.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design Highlights
- **Tailwind CSS v4 CSS-first config** for themes and global constants.
- **Glassmorphism UI** using `backdrop-filter`.
- **Framer Motion Animations**: Scroll-based intersection observation, micro-interactions, layout transitions.
- **tsParticles Background**: Performs lightweight `<canvas>` particle rendering in the hero section.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fpackages%2Fcreate-next-app)

Ensure the `vercel.json` file is pushed so standard security headers and routing options are applied.

## Contact Email Automation

The contact form saves submissions to Supabase and can also send email notifications.

Set these environment variables in `web/.env.local` (and in Vercel project env vars):

- `SMTP_HOST` - SMTP server host (for Hostinger mail this is commonly `smtp.hostinger.com`)
- `SMTP_PORT` - SMTP port (typically `587` or `465`)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `CONTACT_NOTIFY_FROM` - sender address (optional, defaults to `SMTP_USER`)
- `CONTACT_NOTIFY_TO` - comma-separated recipients, e.g. `a@domain.com,b@domain.com`

If SMTP variables are missing, contact submissions are still stored in Supabase and email notifications are skipped.

## Architecture & Code Structure
- `/app` - Pages and Routing logic (App Router)
- `/components/ui` - Primitive components (Button, Badge, Card)
- `/components/sections` - Distinct page sections broken down for main readability
- `/lib` - Helper utilities like `cn` class merger

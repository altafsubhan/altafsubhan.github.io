# Wilshire — Standalone Home Tasks Board

A standalone deployment of the Wilshire home task board (originally served at
`/wilshire` on the main site). This folder is fully self-contained so it can be
hosted on its own domain — for example a free `*.vercel.app` domain.

**Live:** https://wilshire-app.vercel.app

## What it is

A lightweight, shared task tracker for home fixes, tasks, and priorities. It is a
pure static site (HTML/CSS/JS) that talks directly to a Supabase backend for live,
cross-device sync. A soft passcode gate keeps the URL semi-private.

## Files

- `index.html` — markup and task card template
- `wilshire.css` — styles
- `wilshire.js` — app logic + Supabase config (URL, publishable key, table, passcode)
- `vercel.json` — static hosting config for Vercel

## Deploy to Vercel

From this directory:

```bash
vercel deploy --prod
```

Or link the repository in the Vercel dashboard and set the project's **Root
Directory** to `wilshire-app`. There is no build step — Vercel serves the static
files directly.

## Configuration

Backend settings and the passcode live in `wilshire.js` under `CONFIG`. The
Supabase key used is the publishable (anon) key and is safe to ship to the
browser; access should be restricted with Supabase Row Level Security policies.

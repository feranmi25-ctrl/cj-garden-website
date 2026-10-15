# CJ Garden — Showroom static site

This repository contains a mobile-first, luxurious single-page static site built as a showroom for a local garden business called CJ Garden. It includes brand direction, finished copy, styling and interactive elements.

Contents
- index.html — the single-page site
- styles.css — site styling
- scripts.js — interactive behaviours (before/after slider, carousel, form handling)
- logo.svg and placeholder images in /images
- netlify.toml — optional Netlify configuration

Showroom details
- Area (SEO): Riverside & Southshire
- Phone: +44 7700 900123
- Email: hello@cjgarden.example
- WhatsApp (example): +44 7700 900123

Netlify forms
The quote form includes Netlify Forms attributes for easy testing on Netlify. If you deploy to Netlify it will capture submissions automatically. For a production site you should replace example contact details and set up proper email forwarding or a serverless function.

Deploy
- Option A (Netlify): Drag & drop the repository or connect this repo in Netlify. The site is static and requires no build step.
- Option B (Vercel): Import the repo and set the root as the project. Vercel will serve the static files. Netlify Forms won't work without extra work on Vercel — use Formspree or a serverless function instead.

Next steps (recommended)
1. Replace placeholder SVG images with Calum's real photos (hero, before/after pairs and portrait).
2. Update contact details and local SEO phrases.
3. If you want file uploads to work, set up a proper server endpoint or use a form provider that supports attachments.

License
MIT — see LICENSE in the repository.

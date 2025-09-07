Tech stack:
- HTML/XHTML — static pages (XHTML Transitional DOCTYPE)
- Tailwind CSS — via CDN, utility-first styling
- Rivets.js — light client-side interactivity (mentioned in description)
- Netlify — hosting, serverless functions (netlify/functions/)
- PostgreSQL — pg package for DB access (likely from Netlify functions)
- Node.js — Netlify functions runtime
No build step, no bundler, no framework. Static-site-first with serverless API routes.

# Novel Consulting Website

Static, no-build website for Novel Consulting and its two distinct products:

- **NKOS** for expert-led businesses
- **WRO Drafting** for authors and writing teams

The site uses HTML, Tailwind CSS via CDN, a small shared CSS layer, light vanilla JavaScript, and Netlify Forms. Netlify Functions and PostgreSQL support remain available for future bounded workflows.

## Local review

Serve the repository root with any static server, then open `index.html`.

```sh
npx serve .
```

## Validation

```sh
npm run check
```

---

# Local Server 

From the project directory, run:

```bash
cd /Users/novelbamboo/Desktop/github/novelsoftware-web
npx serve . -l 4173
```

Then open:

[http://localhost:4173](http://localhost:4173)

If `serve` is unavailable, use Python:

```bash
python3 -m http.server 4173
```

Validate the site with:

```bash
npm test
```

Note: Netlify Forms are detected during Netlify deployment. Locally, submitting the Knowledge Audit form only navigates to the thank-you page; it does not record a submission.
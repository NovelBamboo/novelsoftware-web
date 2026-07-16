# Novel Consulting Website

Static, no-build website for Novel Consulting and its two distinct products:

- **NKOS** for expert-led businesses
- **WRO Drafting** for authors and writing teams

The four-page site uses HTML, Tailwind CSS via CDN, a shared CSS layer, and light vanilla JavaScript. Its contact form is captured by Netlify Forms and delivered through a Netlify submission event function using Resend.

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

## Contact delivery

The contact form uses this production flow:

1. Netlify detects the static form during deployment and stores each submission.
2. `netlify/functions/contact-submission.mjs` handles Netlify's verified `formSubmitted` event.
3. The function sends the message to `noel@novelbamboo.com` through the Resend API.

Configure these Netlify environment variables before deploying:

- `RESEND` — required Resend API key
- `CONTACT_TO_EMAIL` — optional recipient override
- `CONTACT_FROM_EMAIL` — optional sender override; the sender domain must be verified in Resend

The default sender is Resend's testing sender, `Novel Consulting <onboarding@resend.dev>`, which can deliver only to the email address associated with the Resend account. After verifying `novelbamboo.com` in Resend, set `CONTACT_FROM_EMAIL` to `Novel Consulting <contact@novelbamboo.com>` for branded production delivery.

Netlify Forms are detected only during deployment. A plain local static server cannot process a submission; use `netlify dev` to test the full Netlify flow locally.

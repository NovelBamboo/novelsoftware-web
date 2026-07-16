const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'nkos.html', 'wro-drafting.html', 'contact.html'];
const obsolete = [/Novel Software/i, /software development isn.t hard/i, /Custom GPTs/i, /5.Step Cheat Sheet/i];
const errors = [];

for (const page of pages) {
  const file = path.join(root, page);
  if (!fs.existsSync(file)) {
    errors.push(`${page}: missing`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  for (const required of ['<!doctype html>', '<title>', 'name="viewport"', 'site.css']) {
    if (!html.includes(required)) errors.push(`${page}: missing ${required}`);
  }
  for (const pattern of obsolete) {
    if (pattern.test(html)) errors.push(`${page}: contains obsolete copy matching ${pattern}`);
  }
  const localLinks = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map((match) => match[1]);
  for (const link of localLinks) {
    if (link === '/' || link.startsWith('/.netlify/')) continue;
    const clean = link.split('#')[0].split('?')[0];
    const target = path.join(root, clean);
    if (!fs.existsSync(target)) errors.push(`${page}: broken local reference ${link}`);
  }
}

const contact = fs.readFileSync(path.join(root, 'contact.html'), 'utf8');
for (const marker of ['name="contact"', 'data-netlify="true"', 'name="name"', 'name="subject"', 'name="message"', 'required']) {
  if (!contact.includes(marker)) errors.push(`contact.html: missing ${marker}`);
}

const deliveryFunction = path.join(root, 'netlify/functions/contact-submission.mjs');
if (!fs.existsSync(deliveryFunction)) errors.push('Netlify form delivery function is missing');
else {
  const delivery = fs.readFileSync(deliveryFunction, 'utf8');
  if (!delivery.includes('process.env.RESEND')) errors.push('Netlify form delivery function must use RESEND environment variable');
  if (!delivery.includes('formSubmitted(event)')) errors.push('Netlify form delivery function must subscribe to the formSubmitted event');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${pages.length} pages, contact delivery, local references, and copy exclusions.`);

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'nkos.html', 'wro-drafting.html', 'method.html', 'evidence.html', 'start.html', 'thanks.html'];
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

const start = fs.readFileSync(path.join(root, 'start.html'), 'utf8');
for (const marker of ['data-netlify="true"', 'name="form-name"', 'netlify-honeypot', 'action="/thanks.html"']) {
  if (!start.includes(marker)) errors.push(`start.html: missing ${marker}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${pages.length} pages, local references, copy exclusions, and Netlify form markers.`);

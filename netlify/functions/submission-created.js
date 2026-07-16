'use strict';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const CONTACT_TO_EMAIL = 'noel@novelbamboo.com';
const CONTACT_FROM_EMAIL = 'Novel Consulting <contact@novelbamboo.com>';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function parseSubmission(event) {
  const body = JSON.parse(event.body || '{}');
  const payload = body.payload || {};
  const data = payload.data || {};

  return {
    id: payload.id || body.id || '',
    formName: payload.form_name || data['form-name'] || '',
    name: String(data.name || '').trim(),
    subject: String(data.subject || '').trim(),
    message: String(data.message || '').trim()
  };
}

exports.handler = async function handler(event) {
  let submission;
  try {
    submission = parseSubmission(event);
  } catch (error) {
    console.error('Contact submission payload could not be parsed.', error);
    return { statusCode: 400, body: 'Invalid submission payload.' };
  }

  if (submission.formName !== 'contact') {
    return { statusCode: 200, body: 'Submission ignored.' };
  }

  if (!submission.name || !submission.subject || !submission.message) {
    console.error('Contact submission is missing a required field.', { id: submission.id });
    return { statusCode: 422, body: 'Missing required contact fields.' };
  }

  const apiKey = process.env.RESEND;
  if (!apiKey) {
    console.error('RESEND is not configured for the Netlify Function.');
    return { statusCode: 500, body: 'Email delivery is not configured.' };
  }

  const safeName = escapeHtml(submission.name.slice(0, 120));
  const safeSubject = escapeHtml(submission.subject.slice(0, 160));
  const safeMessage = escapeHtml(submission.message.slice(0, 5000)).replaceAll('\n', '<br />');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Novel-Consulting-Netlify/1.0'
  };
  if (submission.id) headers['Idempotency-Key'] = `contact-${submission.id}`;

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL || CONTACT_TO_EMAIL],
      subject: `[Novel contact] ${submission.subject.slice(0, 160)}`,
      text: `Name: ${submission.name}\nSubject: ${submission.subject}\n\n${submission.message}`,
      html: `<h2>New website enquiry</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Subject:</strong> ${safeSubject}</p><p><strong>Message:</strong><br />${safeMessage}</p>`
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend rejected the contact email.', { status: response.status, detail });
    return { statusCode: 502, body: 'Email delivery failed.' };
  }

  return { statusCode: 200, body: 'Contact email sent.' };
};

exports.parseSubmission = parseSubmission;
exports.escapeHtml = escapeHtml;

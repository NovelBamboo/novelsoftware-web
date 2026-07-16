const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const CONTACT_TO_EMAIL = 'noel@novelbamboo.com';
const CONTACT_FROM_EMAIL = 'Novel Consulting <onboarding@resend.dev>';

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function parseSubmission(event) {
  const data = event?.data || {};
  return {
    id: event?.submission?.id || event?.id || '',
    formName: data['form-name'] || '',
    name: String(data.name || '').trim(),
    subject: String(data.subject || '').trim(),
    message: String(data.message || '').trim()
  };
}

export async function deliverContactEmail(submission, fetchImpl = fetch) {
  const apiKey = process.env.RESEND;
  if (!apiKey) throw new Error('RESEND is not configured for the Netlify Function.');

  const safeName = escapeHtml(submission.name.slice(0, 120));
  const safeSubject = escapeHtml(submission.subject.slice(0, 160));
  const safeMessage = escapeHtml(submission.message.slice(0, 5000)).replaceAll('\n', '<br />');
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Novel-Consulting-Netlify/1.0'
  };
  if (submission.id) headers['Idempotency-Key'] = `contact-${submission.id}`;

  const response = await fetchImpl(RESEND_ENDPOINT, {
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
    throw new Error(`Resend rejected the contact email (${response.status}): ${detail}`);
  }
}

export default {
  async formSubmitted(event) {
    const submission = parseSubmission(event);
    if (submission.formName !== 'contact') return;
    if (!submission.name || !submission.subject || !submission.message) {
      throw new Error(`Contact submission ${submission.id || '(unknown)'} is missing a required field.`);
    }
    await deliverContactEmail(submission);
    console.log('Contact email delivered through Resend.', { id: submission.id });
  }
};

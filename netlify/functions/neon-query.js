// netlify/functions/neon-query.js
// Node runtime (Netlify Functions) using 'pg' with a pooled connection.
// Reuses the pool across invocations to avoid connection churn.

const { Pool } = require('pg');

// Build the Neon connection string with password from env
// Your base DSN (minus password) from the prompt:
const NEON_USER = 'neondb_owner';
const NEON_HOST = 'ep-still-mud-adjkp8gj-pooler.c-2.us-east-1.aws.neon.tech';
const NEON_DB   = 'neondb';

// IMPORTANT: keep the password in an env var:
const NEON_PASSWORD = process.env.NEON_PASSWORD;

// The flags you included:
const QUERY_FLAGS = 'sslmode=require&channel_binding=require';

if (!NEON_PASSWORD) {
  // Fail fast if not configured
  console.error('NEON_PASSWORD is not set');
}

const CONNECTION_STRING = `postgresql://${NEON_USER}:${encodeURIComponent(
  NEON_PASSWORD || ''
)}@${NEON_HOST}/${NEON_DB}?${QUERY_FLAGS}`;

// Reuse a single Pool between invocations (helps with cold starts/limits).
let pool = global._neonPool;
if (!pool) {
  pool = new Pool({
    connectionString: CONNECTION_STRING,
    // Optional: let pg derive SSL from the connection string parameters.
    // If you hit certificate issues, you can explicitly set:
    // ssl: { rejectUnauthorized: true }
    max: 3,           // keep it tiny for serverless
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });
  global._neonPool = pool;
}

exports.handler = async (event) => {
  try {
    // Simple health check / sample query
    const { rows } = await pool.query('select now() as now, version() as version');
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ok: true, db: rows[0] }),
    };
  } catch (err) {
    console.error('DB error:', err);
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Database query failed' }),
    };
  }
};

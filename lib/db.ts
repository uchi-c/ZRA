import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __zraPool: Pool | undefined;
}

// Reuse the pool across hot reloads in dev and across invocations on the
// same serverless instance in production.
export const pool =
  global.__zraPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  global.__zraPool = pool;
}

export async function query<T extends object = Record<string, unknown>>(
  text: string,
  params?: unknown[]
) {
  return pool.query<T>(text, params);
}

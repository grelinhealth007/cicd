// A database test. It runs only when DATABASE_URL is set: locally that is your
// Postgres 18; in CI it is the throw-away Postgres the pipeline starts.
// Without DATABASE_URL it is skipped — check the test count in CI so a skip
// doesn't go unnoticed.

import { SQL } from "bun";
import { expect, test } from "bun:test";

const url = process.env.DATABASE_URL;

test.skipIf(!url)("Postgres answers", async () => {
  const db = new SQL(url!);
  const [row] = await db`select 1 + 1 as two`;
  expect(row.two).toBe(2);
  await db.close();
});

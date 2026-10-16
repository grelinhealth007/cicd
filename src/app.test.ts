import { expect, test } from "bun:test";
import { handle } from "./app";

const get = (path: string) => handle(new Request(`http://localhost${path}`));

test("GET /health says ok", async () => {
  const res = get("/health");
  expect(res.status).toBe(200);
  expect(await res.json()).toMatchObject({ ok: true });
});

test("GET /price applies the discount", async () => {
  const res = get("/price?price=200&percent=10");
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ price: 200, percent: 10, total: 180 });
});

test("GET /price without a price is a 400", async () => {
  const res = get("/price");
  expect(res.status).toBe(400);
});

test("GET /price with a bad percent is a 400", async () => {
  const res = get("/price?price=100&percent=150");
  expect(res.status).toBe(400);
  expect(await res.json()).toEqual({ error: "percent must be between 0 and 100" });
});

test("an unknown path is a 404", () => {
  expect(get("/nope").status).toBe(404);
});

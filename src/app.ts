// The HTTP routes, as a plain fetch handler so tests can call it without a server.
//
//   GET /health                       → { ok: true, version }
//   GET /price?price=200&percent=10   → { price, percent, total }

import { applyDiscount } from "./price";

export function handle(req: Request): Response {
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/health") {
    // APP_VERSION is set when the image is built (see Dockerfile), so /health shows what is deployed.
    return Response.json({ ok: true, version: process.env.APP_VERSION ?? "dev" });
  }

  if (req.method === "GET" && url.pathname === "/price") {
    const price = Number(url.searchParams.get("price"));
    const percent = Number(url.searchParams.get("percent") ?? "0");
    if (!url.searchParams.has("price") || Number.isNaN(price)) {
      return Response.json({ error: "price is required and must be a number" }, { status: 400 });
    }
    try {
      return Response.json({ price, percent, total: applyDiscount(price, percent) });
    } catch (error) {
      return Response.json({ error: (error as Error).message }, { status: 400 });
    }
  }

  return Response.json({ error: "not_found" }, { status: 404 });
}

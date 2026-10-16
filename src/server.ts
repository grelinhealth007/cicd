import { handle } from "./app";

const port = Number(process.env.PORT ?? 3000);

Bun.serve({ port, fetch: handle });

console.log(`cicd listening on http://localhost:${port}`);

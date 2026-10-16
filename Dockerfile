# Built by the CD pipeline on a CI runner (you don't need Docker on your PC).
FROM oven/bun:1.4.2
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY src ./src

# The pipeline passes the commit or version, which /health then reports.
ARG APP_VERSION=dev
ENV APP_VERSION=$APP_VERSION PORT=3000
EXPOSE 3000

CMD ["bun", "src/server.ts"]

FROM node:24-trixie AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .

FROM base AS dev
RUN pnpm i --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

FROM base AS builder
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:24-trixie-slim AS prod
WORKDIR /app
COPY --from=builder /app/ .
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

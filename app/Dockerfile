FROM node:24-trixie AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .

FROM base AS dev
COPY . .
RUN pnpm i --frozen-lockfile
EXPOSE 3000
CMD ["pnpm", "dev"]

# Get started

1. Copy `.env.example` to `.env` and fill in your own values.
2. Install dependencies:

```bash
   pnpm i
```

> Not strictly required to run the app, since `pnpm-lock.yaml` is already committed to the repo — but you'll want this locally so your editor (e.g. VSCode) can resolve packages for IntelliSense.

## Development container

Build and run the container in watch mode:

```bash
docker compose up --watch
```

App available at: http://localhost:3000

## Production container

1. Set `CONTAINER_ENV=prod` in your `.env` file.
2. Build and start the app:

```bash
   docker compose up
```

Or, if you already have a dev image built and need to rebuild:

```bash
   docker compose up --build
```

Test the production build at: http://localhost:3000

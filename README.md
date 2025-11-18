# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Install my jwt (Json Web Token) lib dependancie here:
https://github.com/SamuelLacam/jwt-lib-nodejs.git

Execute on jwt lib project:

```bash
# npm
npm link

# pnpm
pnpm link

# yarn
yarn link

# bun
bun link
```

And execute on this project:

```bash
# npm
npm link jwt

# pnpm
pnpm link jwt

# yarn
yarn link jwt

# bun
bun link jwt
```

Build docker image:

```bash
docker build -t gizelle-image ./docker
```

Run docker container:

```bash
docker run --name gizelle -e MYSQL_ROOT_PASSWORD=<Your DB Password> -p 3306:3306 -d gizelle-image
```

Look .env.example and create your own .env file

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

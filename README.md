# Get started

Look .env.example and create your own .env file

## Development container

Run and Build docker image:

```bash
docker compose up --watch
```

go to: `http://localhost:3000`:

## Production container

Run and Build docker image:

- change `CONTAINER_ENV` key in the .env to `prod`

```bash
docker compose up
```

or this command to rebuild if you are already build dev image

```bash
docker compose up --build
```

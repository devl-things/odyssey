# odyssey

## Run application

1. Clone repository
2. Make a copy of `.env` file and call it `.env.development.local`
3. Adjust env variables in `.env.development.local` file. IMPORTANT: set VOLUME_PATH to path where `odyssey-web` folder is, e.g. `some/other/folders/odyssey/src/odyssey-web`
2. Run below command in `./src` folder
```bash
docker-compose --env-file .env.development.local up --build
```
3. Open http://localhost:5173/ or update the port as the one defined in `.env.development.local`s file

## Attach to container
```bash
docker exec -it container-name /bin/sh
```
# odyssey

## Run application

1. Clone repository
2. Make a copy of `.env` file and call it `dev.env`
3. Adjust env variables in `dev.env` file. IMPORTANT: set VOLUME_PATH to path where `odyssey-web` folder is, e.g. `some/other/folders/odyssey/src/odyssey-web`
2. Run below command in `./src` folder
```bash
docker-compose --env-file dev.env up --build
```
3. Open http://localhost:5173/ or update the port as the one defined in `dev.env`s file

## Attach to container
```bash
docker exec -it container-name /bin/sh
```
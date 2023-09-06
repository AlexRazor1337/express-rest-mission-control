# rest-mission-control

#### Start in Docker:
0. Configure `backend/.env` file:
    ```
    DATABASE_URL='mongodb://localhost:27017/missions'
    LAUNCHESDATA_API_URL='https://api.spacexdata.com/v4/launches/query'
    PORT=8000
    ```
1. Create image: `docker build -t mission-control .`
2. **(Optional)** Run MongoDB in Docker: `docker-compose up -d`
3. Run container: `docker run -it --network=host -p 8000:8000 mission-control:latest`
**NOTE:** `--network=host` is required for the container to be able to access the local hosted DB, so it's optional.

#### Start locally:
1. Install dependencies: `npm run install`
2. Run MongoDB locally: `docker-compose up -d`
3. Configure `backend/.env` file:
    ```
    DATABASE_URL='mongodb://localhost:27017/missions'
    LAUNCHESDATA_API_URL='https://api.spacexdata.com/v4/launches/query'
    PORT=8000
    ```
4. Run backend: `npm run deploy`

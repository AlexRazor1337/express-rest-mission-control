# Space Mission Control app and API

This repository contains a REST API and a Single Page Application (SPA) for managing space missions. The API fetches planet data from the Kepler dataset and rocket launch history from the SpaceXData API. This project is built using Node.js, Express, MongoDB with Mongoose for the backend, and React for the frontend. It also utilizes PM2 for server management and Jest with Supertest for testing.

All tests are rerun on GitHub Actions after commits to main branch.

## Installation

To get started with this project, follow these steps:

1. Clone this repository:

2. Install the project dependencies:
   - Using npm:
     ```bash
     npm run install
     ```
   - Using pnpm (alternative):
     ```bash
     pnpm run install:pnpm
     ```
     
3. **(Optional)** Host the MongoDB database in Docker:
   ```bash
   docker-compose up -d
   ```

4. Set up environment variables by creating a `.env` file in the root directory with the following content:
   ```env
   DATABASE_URL='mongodb://localhost:27017/missions'
   LAUNCHESDATA_API_URL='https://api.spacexdata.com/v4/launches/query'
   PORT=8000
   ```

You can now start the backend and frontend servers in development mode:
```bash
npm run watch
```


Or deploy the application in production mode.
Start in Docker:
1. Create image: `docker build -t mission-control .`
2. **(Optional)** Run MongoDB in Docker: `docker-compose up -d`
3. Run container: `docker run -it --network=host -p 8000:8000 mission-control:latest`
**NOTE:** `--network=host` is required for the container to be able to access the local hosted DB, so it's optional.

#### Start locally:
1. Install dependencies: `npm run install`
2. Run MongoDB locally: `docker-compose up -d`
3. Configure `backend/.env` file:
    ```env
    DATABASE_URL='mongodb://localhost:27017/missions'
    LAUNCHESDATA_API_URL='https://api.spacexdata.com/v4/launches/query'
    PORT=8000
    ```
4. Start backend: `npm run deploy`

This will build the frontend and start the backend server on port 8000, hosting the SPA. You can now access the application in your browser at `http://localhost:8000`.

## API Endpoints

### Group: Planets

- `GET /v1/planets`
  - Description: Retrieves a list of all planets from the Kepler dataset.
### Group: Launches

- `GET /v1/launches`
  - Description: Retrieves a list of all rocket launches.

- `POST /v1/launches`
  - Description: Adds a new rocket launch to the database.

- `DELETE /v1/launches/:id`
  - Description: Deletes a rocket launch by its ID.



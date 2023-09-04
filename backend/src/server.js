import dotenv from 'dotenv';
dotenv.config()

import http from 'http';

import app from './app.js';
import planets from './models/planets.model.js';
import { mongoConnect } from './services/mongo.js';

const PORT = process.env.PORT || 8000;

await mongoConnect()
await planets.loadPlanetsData()

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

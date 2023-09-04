import dotenv from 'dotenv';
dotenv.config()

import http from 'http';

import mongoose from 'mongoose';

import app from './app.js';
import planets from './models/planets.model.js';

const PORT = process.env.PORT || 8000;

await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
await planets.loadPlanetsData()

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

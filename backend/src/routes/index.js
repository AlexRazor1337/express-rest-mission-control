import express from 'express';

import planetsRouter from './planets/planets.router.js';
import launchesRouter from './launches/launches.router.js';

export const V1 = express.Router();

V1.use('/planets', planetsRouter);
V1.use('/launches', launchesRouter);

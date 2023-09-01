import express from 'express';
import { getAllLaunches, addNewLaunch } from './launches.controller.js';

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', addNewLaunch);

export default launchesRouter;

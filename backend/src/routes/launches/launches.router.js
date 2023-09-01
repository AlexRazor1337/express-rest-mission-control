import express from 'express';
import { getAllLaunches, addNewLaunch, deleteLaunch } from './launches.controller.js';

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', addNewLaunch);
launchesRouter.delete('/:id', deleteLaunch);

export default launchesRouter;

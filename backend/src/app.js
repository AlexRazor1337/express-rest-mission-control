import path from 'path';

import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import planetsRouter from './routes/planets/planets.router.js';
import launchesRouter from './routes/launches/launches.router.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
});


export default app;

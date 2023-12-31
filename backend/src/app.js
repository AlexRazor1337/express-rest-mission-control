import path from 'path';

import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import { V1 } from './routes/index.js';

const app = express();

app.use(cors({
    origin: `http://localhost:${process.env.PORT || 8000}`,
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/v1', V1);

app.get('/*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
});

export default app;

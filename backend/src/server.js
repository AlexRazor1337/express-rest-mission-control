import http from 'http';

import app from './app.js';
import planets from './models/planets.model.js';

const PORT = process.env.PORT || 8000;

await planets.loadPlanetsData()

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

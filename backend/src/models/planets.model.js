import path from "path";
import { createReadStream } from "fs";

import { parse } from "csv-parse";

const planets = [];

const ___dirname = path.resolve();

const isHabbitable = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

const DATA_FILE = 'kepler_data.csv'

const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        createReadStream(path.join(
            ___dirname,
            'src',
            'data',
            DATA_FILE
        )).pipe(parse({
            comment: "#",
            columns: true,
        })).on('data', (data) => {
            if (isHabbitable(data))
                planets.push(data);
        }).on('end', () => {
            resolve();
        }).on('error', (error) => {
            reject(error);
        });
    });
}

const getAllPlanets = () => {
    return planets;
}

export default {
    loadPlanetsData,
    getAllPlanets
}

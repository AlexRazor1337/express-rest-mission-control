import path from "path";
import { createReadStream } from "fs";

import { parse } from "csv-parse";

import { planets } from "./planets.mongo.js";

const ___dirname = path.resolve();

const isHabbitable = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

const DATA_FILE = 'kepler_data.csv'

const savePlanet = async (planet) => {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    } catch (error) {
        console.error(`Could not save planet ${error}`);
    }
}

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
        })).on('data', async (data) => {
            if (isHabbitable(data))
                await savePlanet(data)
        }).on('end', () => {
            resolve();
        }).on('error', (error) => {
            reject(error);
        });
    });
}

const getAllPlanets = async () => {
    return await planets.find({}, {
        '_id': 0,
        '__v': 0,
    });
}

export default {
    loadPlanetsData,
    getAllPlanets
}

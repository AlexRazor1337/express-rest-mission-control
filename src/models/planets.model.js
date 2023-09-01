import { parse } from "csv-parse";
import { createReadStream } from "fs";

const planets = [];

const isHabbitable = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        createReadStream("./src/data/kepler_data.csv").pipe(parse({
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


export {
    planets,
    loadPlanetsData
}

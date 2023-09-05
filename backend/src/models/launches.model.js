import axios from 'axios';

import { launches } from "./launches.mongo.js";
import { planets } from "./planets.mongo.js";

const getAllLaunches = async () => {
    return await launches.find({}, {
        '_id': 0,
        '_v': 0
    });
}

const LAUNCHESDATA_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const findLaunch = async (filter) => {
    return await launches.findOne(filter);
}

const loadLaunchData = async () => {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    
    console.log(firstLaunch);
    
    if (firstLaunch) {
        console.log('Launch data already loaded!');
        return;
    }
    
    const result = await axios.post(LAUNCHESDATA_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        'name': 1,
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1,
                    }
                },
            ],
        },
    });
    
    if (result.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }
    
    const launchDocs = result.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });
        
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        };
        
        console.log(`${launch.flightNumber} ${launch.mission}`);
        
        await saveLaunch(launch, false);
    }
}

const getLatestFlightNumber = async () => {
    const latestLaunch = await launches.findOne().sort('-flightNumber');
    
    if (!latestLaunch) {
        return 1;
    }
    
    return latestLaunch.flightNumber;
}

const saveLaunch = async (newLaunch, fromClient = true) => {
    if (fromClient) {
        return await launches.create(Object.assign(newLaunch, {
            flightNumber: await getLatestFlightNumber() + 1,
            upcoming: true,
            success: true,
            customer: ['ZTM', 'NASA'],
            }
        ))
    } else {
        console.log(newLaunch);
        return await launches.create(newLaunch);
    }
}

const addNewLaunch = async (newLaunch) => {
    if (await planets.findOne({ keplerName: newLaunch.target })) {
        const launch = await saveLaunch(newLaunch);
        
        return launch;
    } else {
        throw new Error('No matching planet was found');
    }
}

const deleteLaunch = async (flightNumber) => {
    return await launches.updateOne({
        flightNumber,
    }, {
        upcoming: false,
        success: false,
    });
}

const existsLaunchWithId = async (launchId) => {
    return findLaunch({
        flightNumber: launchId,
    });
}

export default {
    getAllLaunches,
    addNewLaunch,
    deleteLaunch,
    existsLaunchWithId,
    loadLaunchData
}

import { launches } from "./launches.mongo.js";
import { planets } from "./planets.mongo.js";

const getAllLaunches = async () => {
    return await launches.find({}, {
        '_id': 0,
        '_v': 0
    });
}

const getLatestFlightNumber = async () => {
    const latestLaunch = await launches.findOne().sort('-flightNumber');
    
    if (!latestLaunch) {
        return 1;
    }
    
    return latestLaunch.flightNumber;
}

const saveLaunch = async (newLaunch) => {
    const launch = await launches.create(Object.assign(newLaunch, {
        flightNumber: await getLatestFlightNumber() + 1,
        upcoming: true,
        success: true,
        customer: ['ZTM', 'NASA'],
        }
    ))
    
    return launch;
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
    return await launches.findOne({
        flightNumber: launchId,
    });
}

export default {
    getAllLaunches,
    addNewLaunch,
    deleteLaunch,
    existsLaunchWithId
}

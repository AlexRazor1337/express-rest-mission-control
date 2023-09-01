const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
    return Array.from(launches.values());
}

const addNewLaunch = (newLaunch) => {
    const latestFlightNumber = Math.max(...launches.keys()) + 1;
    launches.set(latestFlightNumber, Object.assign(newLaunch, {
        flightNumber: latestFlightNumber,
        upcoming: true,
        success: true,
        customer: ['ZTM', 'NASA'],
        }
    ));
}

const deleteLaunch = (flightNumber) => {
    const aborted = launches.get(flightNumber);
    
    aborted.upcoming = false;
    aborted.success = true;
    
    return aborted;
}

const existsLaunchWithId = (launchId) => {
    return launches.has(launchId);
}

export default {
    getAllLaunches,
    addNewLaunch,
    deleteLaunch,
    existsLaunchWithId
}

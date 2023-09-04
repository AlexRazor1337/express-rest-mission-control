import launches from "../../models/launches.model.js"

const getAllLaunches = async (req, res) => {
    return res.status(200).json(await launches.getAllLaunches());  
}

const addNewLaunch = async (req, res) => {
    const launch = req.body;
    
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }
    
    launch.launchDate = new Date(launch.launchDate);
    
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    } 
    
    await launches.addNewLaunch(launch);
    return res.status(201).json(launch);
}

const deleteLaunch = async (req, res) => {
    const launchId = parseInt(req.params.id);
    
    const launch = await launches.existsLaunchWithId(launchId);
    
    if (!launch) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }
    
    const launchDeleted = await launches.deleteLaunch(launchId);
    return res.status(200).json(launchDeleted);
}

export {
    getAllLaunches,
    addNewLaunch,
    deleteLaunch
};

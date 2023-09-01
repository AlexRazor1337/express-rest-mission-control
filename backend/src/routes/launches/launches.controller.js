import launches from "../../models/launches.model.js"

const getAllLaunches = (req, res) => {
    return res.status(200).json(launches.getAllLaunches());  
}

const addNewLaunch = (req, res) => {
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
    
    launches.addNewLaunch(launch);
    return res.status(201).json(launch);
}

export {
    getAllLaunches,
    addNewLaunch
};

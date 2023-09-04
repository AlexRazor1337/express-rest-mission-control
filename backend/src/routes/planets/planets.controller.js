import planets from "../../models/planets.model.js";

const getAllPlanets = async (req, res) => {
  return res.status(200).json(await planets.getAllPlanets());  
};

export {
    getAllPlanets
};

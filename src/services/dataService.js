import * as serverApi from "../api/serverApi";

const endPoints = {
  makesModels: "/jsonstore/vehicles",
  regions: "/jsonstore/regions",
};

const getMakesModels = () => {
  return serverApi.get(endPoints.makesModels);
};

const getRegions = () => {
  return serverApi.get(endPoints.regions);
};

export { getMakesModels, getRegions };

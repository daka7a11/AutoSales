import useRequest from "./useRequest";

const endPoints = {
  makesModels: "/data/vehicles",
  regions: "/data/regions",
  create: "/data/advertisements",
  advertisements: "/data/advertisements",
};

const useData = () => {
  const request = useRequest();

  const getMakesModels = () => {
    return request
      .get(endPoints.makesModels)
      .then((data) => Object.values(data));
  };

  const getRegions = () => {
    return request.get(endPoints.regions).then((data) => Object.values(data));
  };

  const createAdvertisement = (data) => {
    return request.post(endPoints.create, data);
  };

  const getAdvertisements = () => {
    return request.get(endPoints.advertisements);
  };

  const getAdvertisement = (id) => {
    return request.get(endPoints.advertisements + "/" + id);
  };

  return {
    getMakesModels,
    getRegions,
    createAdvertisement,
    getAdvertisements,
    getAdvertisement,
  };
};

export default useData;

import useRequest from "./useRequest";
import { useAuthContext } from "../context/AuthContext";

const endPoints = {
  makesModels: "/data/vehicles",
  regions: "/data/regions",
  create: "/data/advertisements",
  advertisements: "/data/advertisements",
  likes: "/data/likes",
};

const useData = () => {
  const { getUserData, clearUseData } = useAuthContext();
  const request = useRequest(getUserData, clearUseData);

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

  const deleteAdvertisement = (id) => {
    return request.del(endPoints.advertisements + "/" + id);
  };

  const likeAdvertisement = (vehicleId) => {
    const data = {
      vehicleId,
    };
    return request.post(endPoints.likes, data);
  };

  const getAdvertisementLikes = (id) => {
    const encodedUrl = encodeURIComponent(`vehicleId="${id}"`);
    return request.get(endPoints.likes + "?where=" + encodedUrl);
  };

  const deleteLike = (likeId) => {
    return request.del(endPoints.likes + "/" + likeId);
  };

  return {
    getMakesModels,
    getRegions,
    createAdvertisement,
    getAdvertisements,
    getAdvertisement,
    deleteAdvertisement,
    likeAdvertisement,
    getAdvertisementLikes,
    deleteLike,
  };
};

export default useData;

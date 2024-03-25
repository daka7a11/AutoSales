import useRequest from "./useRequest";
import { useAuthContext } from "../context/AuthContext";

const endPoints = {
  makesModels: "/static/makes-models",
  regions: "/static/regions",
  create: "/vehicles",
  edit: "/vehicles/",
  advertisements: "/vehicles",
  like: "/vehicles/like/",
  recentlyAdded: "/vehicles/recently-added",
  mostLiked: "/vehicles/most-liked",
  myPosts: "/vehicles/my-posts",
};

const useData = () => {
  const { getUserData, clearUseData } = useAuthContext();
  const request = useRequest(getUserData, clearUseData);

  const getMakesModels = async () => {
    const data = await request.get(endPoints.makesModels);
    return JSON.parse(data);
  };

  const getRegions = async () => {
    const data = await request.get(endPoints.regions);
    return JSON.parse(data);
  };

  const createAdvertisement = async (data) => {
    return request.post(endPoints.create, data);
  };

  const editAdvertisement = (id, data) => {
    return request.put(endPoints.edit + id, data);
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
    return request.post(endPoints.like + vehicleId);
  };

  const deleteLike = (vehicleId) => {
    return request.del(endPoints.like + vehicleId);
  };

  const getRecentlyAdded = async () => {
    return request.get(endPoints.recentlyAdded);
  };

  const getMostLiked = async () => {
    return request.get(endPoints.mostLiked);
  };

  const getMyPosts = async () => {
    return request.get(endPoints.myPosts);
  };

  return {
    getMakesModels,
    getRegions,
    createAdvertisement,
    editAdvertisement,
    getAdvertisements,
    getAdvertisement,
    deleteAdvertisement,
    likeAdvertisement,
    deleteLike,
    getRecentlyAdded,
    getMostLiked,
    getMyPosts,
  };
};

export default useData;

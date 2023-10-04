import useRequest from "./useRequest";
import { useAuthContext } from "../context/AuthContext";

const endPoints = {
  makesModels: "/data/vehicles",
  regions: "/data/regions",
  create: "/data/advertisements",
  edit: "/data/advertisements/",
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
    const data = {
      vehicleId,
    };
    return request.post(endPoints.likes, data);
  };

  const getLikes = () => {
    return request.get(endPoints.likes);
  };

  const getAdvertisementLikes = (id) => {
    const encodedUrl = encodeURIComponent(`vehicleId="${id}"`);
    return request.get(endPoints.likes + "?where=" + encodedUrl);
  };

  const deleteLike = (likeId) => {
    return request.del(endPoints.likes + "/" + likeId);
  };

  const getRecentlyAdded = async () => {
    const advertisements = await getAdvertisements();
    return advertisements
      .sort(
        (a, b) =>
          new Date(b.manufacturing_date) - new Date(a.manufacturing_date)
      )
      .slice(0, 4);
  };

  const getMostLiked = async () => {
    let likes = (await getLikes()).reduce((acc, curr) => {
      let current = acc.find((x) => x.vehicleId === curr.vehicleId);

      if (current === undefined) {
        current = { vehicleId: curr.vehicleId, likes: 0 };
        acc.push(current);
      }

      current.likes++;

      return acc;
    }, []);
    likes = likes.sort((a, b) => b.likes - a.likes).slice(0, 4);

    likes = likes.reduce((acc, curr) => {
      acc.push(getAdvertisement(curr.vehicleId));
      return acc;
    }, []);

    const mostLiked = await Promise.all(likes);

    return mostLiked;
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
    getAdvertisementLikes,
    deleteLike,
    getRecentlyAdded,
    getMostLiked,
  };
};

export default useData;

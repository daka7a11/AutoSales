import { Fragment, useEffect, useState } from "react";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import CreatePost from "../Create/CreatePost";

const Edit = () => {
  const { id } = useParams();
  const { getAdvertisement } = useData();

  const [vehicle, setVehicle] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedVehicle = await getAdvertisement(id);
      setVehicle(fetchedVehicle);
    }

    fetchData();
  }, [id]);
  return (
    <Fragment>
      <CreatePost vehicle={vehicle} />
    </Fragment>
  );
};

export default Edit;

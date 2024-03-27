import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import { useAuthContext } from "../../context/AuthContext";
import VehiclesList from "../Vehicles/VehiclesList";
import Loader from "../UI/Loader";

const MyPosts = () => {
  const authContext = useAuthContext();

  const { getMyPosts } = useData();

  const navigate = useNavigate();

  const userData = authContext.getUserData();

  const [myPosts, setMyPosts] = useState([]);

  const [isDataFetching, setIsDataFetching] = useState(false);

  useEffect(() => {
    if (userData === undefined) {
      return;
    }

    if (userData === null) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      setIsDataFetching(true);
      const posts = await getMyPosts();
      setMyPosts(posts);
      setIsDataFetching(false);
    }

    fetchData();
  }, [userData]);

  return (
    <div className={`page-container`}>
      <div className={`page-title`}>
        <h2>My posts</h2>
      </div>
      {isDataFetching ? <Loader /> : <VehiclesList vehicles={myPosts} />}
    </div>
  );
};

export default MyPosts;

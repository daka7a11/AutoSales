import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import { useAuthContext } from "../../context/AuthContext";
import VehiclesList from "../Vehicles/VehiclesList";

const MyPosts = () => {
  const authContext = useAuthContext();

  const { getMyPosts } = useData();

  const navigate = useNavigate();

  const userData = authContext.getUserData();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (userData === undefined) {
      return;
    }

    if (userData === null) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      const posts = await getMyPosts();
      setMyPosts(posts);
    }

    fetchData();
  }, [userData]);

  return (
    <div className={`page-container`}>
      <div className={`page-title`}>
        <h2>My posts</h2>
      </div>

      <VehiclesList vehicles={myPosts} />
    </div>
  );
};

export default MyPosts;

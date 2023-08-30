import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import { useAuthContext } from "../../context/AuthContext";

const MyPosts = () => {
  const authContext = useAuthContext();

  const { getAdvertisements } = useData();

  const navigate = useNavigate();

  const userData = authContext.getUserData();

  useEffect(() => {
    console.log(userData);

    if (userData === undefined) {
      console.log("UserDataInEffect");

      console.log(userData);
      return;
    }

    if (userData === null) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      getAdvertisements().then((data) =>
        console.log(
          data.filter((x) => x._ownerId === authContext.getUserData()._id)
        )
      );
    }

    fetchData();
  }, [userData]);

  return (
    <div className={`page-container`}>
      <div className={`page-title`}>
        <h2>My posts</h2>
      </div>
    </div>
  );
};

export default MyPosts;

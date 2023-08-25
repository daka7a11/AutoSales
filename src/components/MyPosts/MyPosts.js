import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";

const MyPosts = () => {
  const authContext = useContext(AuthContext);

  const { getAdvertisements } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    const userId = authContext.getUserData()?._id;

    if (!userId) {
      navigate("/login");
      return;
    }

    async function fetchData() {}

    fetchData();
  }, []);

  console.log(authContext.getUserData());
  getAdvertisements().then((data) =>
    console.log(
      data.filter((x) => x._ownerId === authContext.getUserData()._id)
    )
  );

  return (
    <div className={`page-container`}>
      <div className={`page-title`}>
        <h2>My posts</h2>
      </div>
    </div>
  );
};

export default MyPosts;

import styles from "./Features.module.css";
import Cart from "../UI/Cart";
import { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import Loader from "../UI/Loader";

const Features = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [mostLiked, setMostLiked] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(false);

  const { getRecentlyAdded, getMostLiked } = useData();

  useEffect(() => {
    async function fetchData() {
      setIsDataFetching(true);
      const recentlyProm = getRecentlyAdded();
      const mostLikedProm = getMostLiked();

      const featuresData = await Promise.all([recentlyProm, mostLikedProm]);
      setRecentlyAdded(featuresData[0]);
      setMostLiked(featuresData[1]);
      setIsDataFetching(false);
    }
    fetchData();
  }, []);

  return (
    <section id="features">
      <div className={`${styles["features-container"]} page-container`}>
        <div id="recently-added" className={styles["recently-added-container"]}>
          <h2 className={styles["container-title"]}>Recently added</h2>

          {isDataFetching && <Loader />}
          {!isDataFetching &&
            recentlyAdded.map((v) => <Cart key={v._id} vehicle={v} />)}
        </div>
        <div id="most-liked" className={styles["most-liked-container"]}>
          <h2 className={styles["container-title"]}>Most liked</h2>
          {isDataFetching && <Loader />}
          {!isDataFetching &&
            mostLiked.map((v) => <Cart key={v._id} vehicle={v} />)}
        </div>
      </div>
    </section>
  );
};

export default Features;

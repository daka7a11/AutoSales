import styles from "./Features.module.css";
import Cart from "../UI/Cart";
import { useEffect, useState } from "react";
import useData from "../../hooks/useData";

const Features = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [mostLiked, setMostLiked] = useState([]);

  const { getRecentlyAdded, getMostLiked } = useData();

  useEffect(() => {
    async function fetchData() {
      const recentlyProm = getRecentlyAdded();
      const mostLikedProm = await getMostLiked();

      const featuresData = await Promise.all([recentlyProm, mostLikedProm]);
      setRecentlyAdded(featuresData[0]);
      setMostLiked(featuresData[1]);
    }
    fetchData();
  }, []);

  return (
    <section id="features">
      <div className={`${styles["features-container"]} page-container`}>
        <div id="recently-added" className={styles["recently-added-container"]}>
          <h2 className={styles["container-title"]}>Recently added</h2>
          {recentlyAdded.map((v) => (
            <Cart key={v._id} vehicle={v} />
          ))}
        </div>
        <div id="most-liked" className={styles["most-liked-container"]}>
          <h2 className={styles["container-title"]}>Most liked</h2>
          {mostLiked.map((v) => (
            <Cart key={v._id} vehicle={v} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

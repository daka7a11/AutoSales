import styles from "./Features.module.css";
import Cart from "../UI/Cart";
import { useEffect, useState } from "react";
import useData from "../../hooks/useData";

const Features = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [mostLiked, setMostLiked] = useState([]);

  const { getAdvertisements } = useData();

  useEffect(() => {
    async function fetchData() {
      const vehicles = await getAdvertisements();
      console.log(vehicles);
    }
    fetchData();
  }, []);

  return (
    <section id="features">
      <div className={`${styles["features-container"]} page-container`}>
        <div id="recently-added" className={styles["recently-added-container"]}>
          <h2 className={styles["container-title"]}>Recently added</h2>
          {recentlyAdded.map((v) => (
            <Cart key={v.id} vehicle={v} />
          ))}
        </div>
        <div id="most-liked" className={styles["most-liked-container"]}>
          <h2 className={styles["container-title"]}>Most liked</h2>
          {mostLiked.map((v) => (
            <Cart key={v.id} vehicle={v} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

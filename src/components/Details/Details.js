import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import styles from "./Details.module.css";
import ImageSlider from "../UI/ImageSlider";
import ImagePopup from "../UI/ImagePopup";

const Details = () => {
  const [vehicle, setVehicle] = useState({});

  const { id } = useParams();
  const { getAdvertisement } = useData();

  useEffect(() => {
    async function fetchData() {
      const fetchedVehicle = await getAdvertisement(id);
      setVehicle(fetchedVehicle);
    }

    fetchData();
  }, []);

  const vehicleView = (
    <div className={styles["details-container"]}>
      <div className={styles["title-container"]}>
        <h2>{vehicle.title}</h2>
      </div>
      <div className={styles["image-slider"]}>
        <ImageSlider images={vehicle.images} />
      </div>
      <section className={styles["specifications"]}>
        <div className={styles["specification"]}>
          <span>Make:</span>
          <span className={styles["specification-detail"]}>{vehicle.make}</span>
        </div>
        <div className={styles["specification"]}>
          <span>Model:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.model}
          </span>
        </div>
        <div className={styles["specification"]}>
          <span>Fuel:</span>
          <span className={styles["specification-detail"]}>{vehicle.fuel}</span>
        </div>
        <div className={styles["specification"]}>
          <span>Gearbox:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.gearbox}
          </span>
        </div>
        <div className={styles["specification"]}>
          <span>Manufacturing date:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.manufacturing_date}
          </span>
        </div>
        <div className={styles["specification"]}>
          <span>Region:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.region}
          </span>
        </div>
        <div className={styles["specification"]}>
          <span>Horse power:</span>
          <span className={styles["specification-detail"]}>{vehicle.hp}</span>
        </div>
        <div className={styles["specification"]}>
          <span>Mileage:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.mileage}
          </span>
        </div>
        <div className={`${styles["specification"]} ${styles["price"]}`}>
          <span className={styles["specification-detail"]}>
            ${vehicle.price}
          </span>
        </div>
        <div className={`${styles["specification"]} ${styles["description"]}`}>
          <span className={styles["specification-detail"]}>
            {vehicle.description}
          </span>
        </div>
      </section>
    </div>
  );

  return vehicle ? vehicleView : "";
};

export default Details;

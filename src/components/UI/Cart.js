import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = ({ vehicle, className }) => {
  const navigate = useNavigate();

  if (!vehicle) {
    return;
  }

  const detailsClickHandler = () => {
    navigate(`/details/${vehicle._id}`);
  };

  return (
    <div
      onClick={detailsClickHandler}
      className={`${styles["cart"]} ${className || ""}`}
    >
      <img className={styles["cart-img"]} src={vehicle.images[0]} />
      <div className={`${styles["cart-text"]}`}>
        <p className={`${styles["text"]} ${styles["item-title"]}`}>
          {vehicle.title}
        </p>
        <div className={`${styles["text"]} ${styles["item-price"]}`}>
          <ion-icon class={styles["icon"]} name="logo-usd"></ion-icon>
          <p>{vehicle.price}</p>
        </div>
        <div className={`${styles["text"]} ${styles["item-km"]}`}>
          <ion-icon class={styles["icon"]} name="speedometer"></ion-icon>
          <p>{vehicle.mileage} km</p>
        </div>
        <div className={`${styles["text"]} ${styles["item-region"]}`}>
          <ion-icon class={styles["icon"]} name="location-sharp"></ion-icon>
          <p>{vehicle.region}</p>
        </div>
        <div
          className={`${styles["text"]} ${styles["item-manufacturing-date"]}`}
        >
          <ion-icon class={styles["icon"]} name="calendar"></ion-icon>
          <p>{vehicle.manufacturingDate.slice(0, 4)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

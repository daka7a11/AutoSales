import styles from "./Cart.module.css";

const Cart = ({ vehicle, className }) => {
  if (!vehicle) {
    return;
  }

  return (
    <div className={`${styles["cart"]} ${className || ""}`}>
      <img className={styles["cart-img"]} src={vehicle.img} />
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
          <p>{vehicle.manufacturing_date}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

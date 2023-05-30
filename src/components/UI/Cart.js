import styles from "./Cart.module.css";

const Cart = () => {
  return (
    <div className={styles["cart"]}>
      <img
        className={styles["cart-img"]}
        src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960"
      />
      <div className={`${styles["cart-text"]}`}>
        <p className={`${styles["text"]} ${styles["item-title"]}`}>
          Toyota corolla 300 kubica
        </p>
        <div className={`${styles["text"]} ${styles["item-price"]}`}>
          <ion-icon class={styles["icon"]} name="logo-usd"></ion-icon>
          <p>5000</p>
        </div>
        <div className={`${styles["text"]} ${styles["item-km"]}`}>
          <ion-icon class={styles["icon"]} name="speedometer"></ion-icon>
          <p>199 000 km</p>
        </div>
        <div className={`${styles["text"]} ${styles["item-city"]}`}>
          <ion-icon class={styles["icon"]} name="location-sharp"></ion-icon>
          <p>Bulgaria</p>
        </div>
        <div className={`${styles["text"]} ${styles["item-city"]}`}>
          <ion-icon class={styles["icon"]} name="calendar"></ion-icon>
          <p>2020</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

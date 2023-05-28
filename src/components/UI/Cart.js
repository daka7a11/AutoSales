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
        <p className={`${styles["text"]} ${styles["item-price"]}`}>5000</p>
        <p className={`${styles["text"]} ${styles["item-km"]}`}>199 000</p>
        <p className={`${styles["text"]} ${styles["item-city"]}`}>Town</p>
      </div>
    </div>
  );
};

export default Cart;

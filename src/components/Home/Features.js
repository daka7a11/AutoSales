import styles from "./Features.module.css";
import Container from "../UI/Container";
import Cart from "../UI/Cart";

const Features = () => {
  return (
    <section id="features">
      <Container className={styles["features-container"]}>
        <div id="recently-added" className={styles["recently-added-container"]}>
          <h2 className={styles["container-title"]}>Recently added</h2>
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
        </div>
        <div id="most-liked" className={styles["most-liked-container"]}>
          <h2 className={styles["container-title"]}>Most liked</h2>
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
        </div>
      </Container>
    </section>
  );
};

export default Features;

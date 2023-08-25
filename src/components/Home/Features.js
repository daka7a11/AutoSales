import styles from "./Features.module.css";
import Cart from "../UI/Cart";

const Features = () => {
  return (
    <section id="features">
      <div className={`${styles["features-container"]} page-container`}>
        <div id="recently-added" className={styles["recently-added-container"]}>
          <h2 className={styles["container-title"]}>Recently added</h2>
          {[]?.map((v) => (
            <Cart key={v.id} vehicle={v} />
          ))}
        </div>
        <div id="most-liked" className={styles["most-liked-container"]}>
          <h2 className={styles["container-title"]}>Most liked</h2>
          {[]?.map((v) => (
            <Cart key={v.id} vehicle={v} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

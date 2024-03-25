import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles["welcome-text-container"]} page-container`}>
        <span className={styles["welcome-text"]}>
          Welcome to our dynamic car marketplace!
          <p className={styles["description"]}>
            Whether you're ready to sell your vehicle or searching for your
            ideal ride, our platform connects you with a diverse community of
            car enthusiasts.
          </p>
        </span>
      </div>
      <div className={`${styles["features-links-container"]} page-container`}>
        <div className={styles["features-links"]}>
          <div className={styles["features-link"]}>
            <Link to="/vehicles" className={styles["feature-link"]}>
              <span>Find</span> the perfect match for your automotive needs.
            </Link>
          </div>
          <div className={styles["features-link"]}>
            <a href="#recently-added" className={styles["feature-link"]}>
              <span>Explore</span> the recently added vehicle.
            </a>
          </div>
          <div className={styles["features-link"]}>
            <a href="#most-liked" className={styles["feature-link"]}>
              <span>Discover</span> our most liked cars.
            </a>
          </div>
        </div>
      </div>
      <a href="#features">
        <ion-icon
          class={styles["arr-icon"]}
          name="chevron-down-sharp"
        ></ion-icon>
      </a>
    </section>
  );
};

export default Hero;

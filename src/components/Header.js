import styles from "./Header.module.css";
import Navbar from "./Navbar";
import Container from "./UI/Container";

const Hero = () => {
  return (
    <section className={styles.header}>
      <Navbar></Navbar>
      <Container className={styles["welcome-text-container"]}>
        <span className={styles["welcome-text"]}>
          Welcome to our dynamic car marketplace!
          <p className={styles["description"]}>
            Whether you're ready to sell your vehicle or searching for your
            ideal ride, our platform connects you with a diverse community of
            car enthusiasts.
          </p>
        </span>
      </Container>
      <Container className={styles["features-links-container"]}>
        <div className={styles["features-links"]}>
          <div className={styles["features-link"]}>
            <a href="#" className={styles["feature-link"]}>
              Begin
            </a>{" "}
            your journey now and discover the perfect match for your automotive
            needs.
          </div>
          <div className={styles["features-link"]}>
            <a href="#" className={styles["feature-link"]}>
              Explore
            </a>{" "}
            the recently added vehicle.
          </div>
          <div className={styles["features-link"]}>
            <a href="#" className={styles["feature-link"]}>
              Discover
            </a>{" "}
            our most liked cars.
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

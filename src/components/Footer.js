import styles from "./Footer.module.css";

import Container from "./UI/Container";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <Container className={styles["container"]}>
        <div className={styles["home-media"]}>
          <a href="#" className={`${styles["home-link"]} ${styles["link"]}`}>
            Auto Sale
          </a>
          <div className={styles["social-media"]}>
            <a className={`${styles["logo"]} ${styles["link"]}`} href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
            <a className={`${styles["logo"]} ${styles["link"]}`} href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a className={`${styles["logo"]} ${styles["link"]}`} href="#">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </div>
        </div>

        <div className={styles["fast-links"]}>
          <a className={styles["link"]} href="#">
            Find your future vehicle
          </a>
          <a className={styles["link"]} href="#">
            Check recently added vehicles
          </a>
          <a className={styles["link"]} href="#">
            Check most liked vehicles
          </a>
        </div>

        <div className={styles["resources"]}>
          <a className={styles["link"]} href="#">
            Privacy Policy
          </a>
          <a className={styles["link"]} href="#">
            Cookie Policy
          </a>
          <a className={styles["link"]} href="#">
            Terms of Use
          </a>
        </div>
        <div className={styles["copyright-container"]}>
          <p>Copyright &copy; 2023 Auto Sales. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

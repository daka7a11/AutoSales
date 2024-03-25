import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={`${styles["container"]} page-container`}>
        <div className={styles["home-media"]}>
          <a href="#" className={`${styles["home-link"]} ${styles["link"]}`}>
            Auto Sales
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
          <a className={styles["link"]} href="/vehicles">
            Find your future vehicle
          </a>
          <a className={styles["link"]} href="/#recently-added">
            Check recently added vehicles
          </a>
          <a className={styles["link"]} href="/#most-liked">
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
      </div>
    </footer>
  );
};

export default Footer;

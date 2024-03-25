import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const Navbar = (props) => {
  const authContext = useAuthContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const menuClickHandler = (e) => {
    console.log(e.target.nodeName);
    if (e.target.nodeName === "A" || e.target.id === "close-menu") {
      setIsMenuOpened(false);
      return;
    }
    if (e.target.id === "open-menu") {
      setIsMenuOpened(true);
      return;
    }
  };

  const userLinks = (
    <>
      <NavLink className={`btn ${styles["nav-link"]}`} to="/create">
        Create post
      </NavLink>
      <NavLink className={`btn ${styles["nav-link"]}`} to="/my-posts">
        My posts
      </NavLink>
      <NavLink className={`btn ${styles["nav-link"]}`} to="/logout">
        Logout
      </NavLink>
    </>
  );

  const guestLinks = (
    <>
      <NavLink className={`btn ${styles["nav-link"]}`} to="/login">
        Login
      </NavLink>
      <NavLink className={`btn ${styles["nav-link"]}`} to="/register">
        Register
      </NavLink>
    </>
  );

  return (
    <nav className={`${styles.navbar} ${props.className}`}>
      <div className={styles["main-actions"]}>
        <NavLink
          className={`btn ${styles["nav-link"]} ${styles["home-link"]}`}
          to="/"
        >
          Auto Sales
        </NavLink>
        <NavLink className={`btn ${styles["nav-link"]}`} to="/vehicles">
          Vehicles
        </NavLink>
      </div>
      <div className={`${styles["user-actions"]} ${styles["max"]}`}>
        {authContext.getUserData() ? userLinks : guestLinks}
      </div>
      <div
        onClick={menuClickHandler}
        className={`${styles["user-actions"]} ${styles["menu-min"]} ${
          isMenuOpened ? styles["opened"] : styles["closed"]
        }`}
      >
        {authContext.getUserData() ? userLinks : guestLinks}
        <ion-icon
          id="close-menu"
          class={`${styles["close-menu"]}`}
          name="close-circle-outline"
        ></ion-icon>
      </div>
      <ion-icon
        onClick={menuClickHandler}
        class={`${styles["icon"]} ${styles["icon-menu"]}`}
        name="menu-outline"
        id="open-menu"
      ></ion-icon>
    </nav>
  );
};

export default Navbar;

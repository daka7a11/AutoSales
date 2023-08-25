import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = (props) => {
  const authContext = useContext(AuthContext);

  const userLinks = (
    <>
      <NavLink className={`btn ${styles["nav-link"]}`}>
        Hello {authContext.getUserData()?.username}
      </NavLink>

      <NavLink className={`btn ${styles["nav-link"]}`} to="/create">
        Create post
      </NavLink>
      <NavLink className={`btn ${styles["nav-link"]}`} to="/my-posts">
        My posts
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
      <div className={styles["user-actions"]}>
        {authContext.getUserData() ? userLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;

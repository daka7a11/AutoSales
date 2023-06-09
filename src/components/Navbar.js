import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = (props) => {
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
        <NavLink className={`btn ${styles["nav-link"]}`} to="/create">
          Create post
        </NavLink>
        <NavLink className={`btn ${styles["nav-link"]}`} to="/my-posts">
          My posts
        </NavLink>
        <NavLink className={`btn ${styles["nav-link"]}`} to="/login">
          Login
        </NavLink>
        <NavLink className={`btn ${styles["nav-link"]}`} to="/register">
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

import styles from "./Auth.module.css";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import useRequest from "../../hooks/useRequest";

const Login = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext);

  const request = useRequest();

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["page-title"]}>
        <h2>Login</h2>
      </div>
      <form className={styles["auth-form"]}>
        <div className={styles["form-wrapper"]}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" />
        </div>
        <div className={styles["form-wrapper"]}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="text" />
        </div>
        <div
          className={`${styles["form-wrapper"]} ${styles["not-member-wrapper"]}`}
        >
          <p>Not a member?</p>
          <a className={styles["sing-up"]} href="">
            Sing up now
          </a>
        </div>
        <div className={styles["form-wrapper"]}>
          <button className={`btn ${styles["submit-btn"]}`} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

import styles from "./Auth.module.css";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const authContext = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));

    authContext.login(email, password);
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["page-title"]}>
        <h2>Login</h2>
      </div>
      <form onSubmit={submitHandler} className={styles["auth-form"]}>
        <div className={styles["form-wrapper"]}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />
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

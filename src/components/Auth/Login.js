import styles from "../UI/Form.module.css";
import authStyles from "./Auth.module.css";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));

    if (!email || !password) {
      return;
    }

    try {
      await authContext.login(email, password);

      navigate("/");
    } catch (err) {
      return;
    }
  };

  const errorSection = (
    <div>
      <p style={{ color: "red", fontSize: 16 }}>{authContext.error}</p>
    </div>
  );

  return (
    <div className={authStyles["form-container"]}>
      <div className={styles["page-title"]}>
        <h2>Login</h2>
      </div>
      <form onSubmit={submitHandler} className={styles["form"]}>
        {authContext.error && errorSection}
        <div className={styles["form-wrapper"]}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />
        </div>
        <div className={styles["form-wrapper"]}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        <div
          className={`${styles["form-wrapper"]} ${styles["not-member-wrapper"]}`}
        >
          <p>Not a member?</p>
          <Link className={authStyles["sing-up"]} to="/register">
            Sing up now
          </Link>
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

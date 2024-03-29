import styles from "../UI/Form.module.css";
import authStyles from "./Auth.module.css";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Errors from "../UI/Errors";
import Loader from "../UI/Loader";

const Login = () => {
  useEffect(() => {
    return () => {
      authContext.clearError();
    };
  }, []);

  const authContext = useAuthContext();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));

    if (!email || !password) {
      return;
    }
    setIsSending(true);
    try {
      const user = await authContext.login(email, password);
      toast.warn(`Welcome ${user.username || user.firstName}!`);
      navigate("/");
    } catch (err) {
      return;
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={authStyles["form-container"]}>
      <div className={`page-title`}>
        <h2>Login</h2>
      </div>
      <form onSubmit={submitHandler} className={styles["form"]}>
        <Errors errors={authContext.errors} />
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
          {isSending ? (
            <Loader />
          ) : (
            <button
              className={`btn ${styles["submit-btn"]}`}
              type="submit"
              disabled={isSending}
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

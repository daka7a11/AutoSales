import styles from "../UI/Form.module.css";
import authStyles from "./Auth.module.css";

import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";

const emptyValidation = (value) => value.trim() !== "";
const emailValidation = (value) => value.includes("@");

const Register = ({}) => {
  useEffect(() => {
    return () => {
      authContext.clearError();
    };
  }, []);

  const authContext = useAuthContext();
  const navigate = useNavigate();
  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBludHandler,
    setIsTouched: firstNameSetIsTouched,
    reset: resetFirstName,
  } = useInput(emptyValidation);

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBludHandler,
    setIsTouched: lastNameSetIsTouched,
    reset: resetLastName,
  } = useInput(emptyValidation);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBludHandler,
    setIsTouched: emailSetIsTouched,
    reset: resetEmail,
  } = useInput(emailValidation);

  const {
    value: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBludHandler,
    setIsTouched: phoneSetIsTouched,
    reset: resetPhone,
  } = useInput(emptyValidation);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBludHandler,
    setIsTouched: passwordSetIsTouched,
    reset: resetPassword,
  } = useInput(emptyValidation);

  const {
    value: enteredConfirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBludHandler,
    setIsTouched: confirmPasswordSetIsTouched,
    reset: resetConfirmPassword,
  } = useInput(emptyValidation);

  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);

  const formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    phoneIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      firstNameSetIsTouched(true);
      lastNameSetIsTouched(true);
      emailSetIsTouched(true);
      phoneSetIsTouched(true);
      passwordSetIsTouched(true);
      confirmPasswordSetIsTouched(true);

      setIsPasswordsMatch(true);

      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      setIsPasswordsMatch(false);
      resetPassword();
      resetConfirmPassword();

      passwordSetIsTouched(true);
      confirmPasswordSetIsTouched(true);

      return;
    }

    setIsPasswordsMatch(true);

    const userData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      phone: enteredPhone,
      password: enteredPassword,
    };

    try {
      await authContext.register(userData);
      navigate("/");
    } catch (error) {
      return;
    }
  };

  const errorSection = (
    <Fragment>
      {authContext.error && (
        <p className={styles["invalid-message"]}>{authContext.error}</p>
      )}
      {!isPasswordsMatch && (
        <p className={styles["invalid-message"]}>Passwords do not match!</p>
      )}
    </Fragment>
  );

  return (
    <div className={authStyles["form-container"]}>
      <div className={`page-title`}>
        <h2>Register</h2>
      </div>
      <form onSubmit={submitHandler} className={styles["form"]}>
        {errorSection}
        <div className={styles["form-wrapper"]}>
          <label htmlFor="first_name">First name</label>
          <input
            className={firstNameHasError ? styles["invalid-input"] : ""}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBludHandler}
            value={enteredFirstName}
            id="first_name"
            name="first_name"
            type="text"
          />
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="last_name">Last name</label>
          <input
            className={lastNameHasError ? styles["invalid-input"] : ""}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBludHandler}
            value={enteredLastName}
            id="last_name"
            name="last_name"
            type="text"
          />
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="email">Email</label>
          <input
            className={emailHasError ? styles["invalid-input"] : ""}
            onChange={emailChangeHandler}
            onBlur={emailBludHandler}
            value={enteredEmail}
            id="email"
            name="email"
            type="text"
          />
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="phone">Phone number</label>
          <input
            className={phoneHasError ? styles["invalid-input"] : ""}
            onChange={phoneChangeHandler}
            onBlur={phoneBludHandler}
            value={enteredPhone}
            id="phone"
            name="phone"
            type="text"
          />
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="password">Password</label>
          <input
            className={passwordHasError ? styles["invalid-input"] : ""}
            onChange={passwordChangeHandler}
            onBlur={passwordBludHandler}
            value={enteredPassword}
            id="password"
            name="password"
            type="password"
          />
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="confirm_password">Confirm password</label>
          <input
            className={confirmPasswordHasError ? styles["invalid-input"] : ""}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBludHandler}
            value={enteredConfirmPassword}
            id="confirm_password"
            name="confirm_password"
            type="password"
          />
        </div>
        <div
          className={`${styles["form-wrapper"]} ${styles["not-member-wrapper"]}`}
        >
          <p>Already have an account?</p>
          <Link className={authStyles["sing-up"]} to="/login">
            Sign in now
          </Link>
        </div>
        <div className={styles["form-wrapper"]}>
          <button className={`btn ${styles["submit-btn"]}`} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

import styles from "../UI/Form.module.css";

const Errors = ({ errors }) => {
  return (
    <>
      {errors?.length > 0 && (
        <div className="errors">
          {errors.map((e) => (
            <p key={e.message} className={styles["invalid-message"]}>
              {e.message}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Errors;

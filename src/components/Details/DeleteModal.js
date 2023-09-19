import styles from "../Vehicles/FilterPopup.module.css";

const DeleteModal = ({ setDeleteModal, deleteHandler }) => {
  const hideModalHandler = (e) => {
    if (e.target.id === "popup-container" || e.target.id === "cancel") {
      setDeleteModal(false);
    }
  };

  return (
    <div
      id="popup-container"
      className={styles["popup-container"]}
      onClick={hideModalHandler}
    >
      <div className={styles["popup"]}>
        <h4 className={styles["popup-heading"]}>
          Are you sure you want to delete the post?
        </h4>
        <div className={styles["popup-actions"]}>
          <button
            className={`btn ${styles["btn-popup"]} ${styles["btn-delete"]}`}
            onClick={deleteHandler}
            id="delete"
          >
            Delete
          </button>
          <button
            className={`btn ${styles["btn-popup"]} ${styles["btn-cancel"]}`}
            onClick={hideModalHandler}
            id="cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

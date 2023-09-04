import styles from "./ImagePopup.module.css";

const ImagePopup = ({ imageSrc, closeImagePopup }) => {
  const popupClickHandler = (e) => {
    if (e.target.getAttribute("name") === "popup-container") {
      closeImagePopup();
    }
  };

  return (
    <div
      name="popup-container"
      className={styles["image-popup-container"]}
      onClick={popupClickHandler}
    >
      <img className={styles["image"]} src={imageSrc} alt="" />
    </div>
  );
};

export default ImagePopup;

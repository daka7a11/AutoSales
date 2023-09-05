import styles from "./ImagePopup.module.css";

const ImagePopup = ({ imageSrc, closeImagePopup }) => {
  const popupClickHandler = (e) => {
    if (e.target.getAttribute("name") === "close-popup") {
      closeImagePopup();
    }
  };

  return (
    <div
      name="close-popup"
      className={styles["image-popup-container"]}
      onClick={popupClickHandler}
    >
      <img className={styles["image"]} src={imageSrc} alt="" />
      <ion-icon
        onClick={() => {
          closeImagePopup();
        }}
        class={styles["close-popup"]}
        name="close-circle"
      ></ion-icon>
    </div>
  );
};

export default ImagePopup;

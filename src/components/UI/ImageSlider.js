import { Fragment, useState } from "react";
import styles from "./ImageSlider.module.css";
import ImagePopup from "./ImagePopup";

const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imagePopup, setImagePopup] = useState(false);

  const prevImageHandler = () => {
    if (imageIndex - 1 < 0) {
      setImageIndex(images.length - 1);
      return;
    }
    setImageIndex((prevState) => prevState - 1);
  };

  const nextImageHandler = () => {
    if (imageIndex + 1 > images.length - 1) {
      setImageIndex(0);
      return;
    }
    setImageIndex((prevState) => prevState + 1);
  };

  if (!images) {
    return;
  }

  const closeImagePopup = () => {
    setImagePopup(false);
  };

  return (
    <Fragment>
      <div className={styles["slider-container"]}>
        <ion-icon
          onClick={prevImageHandler}
          class={styles["left-swap"]}
          name="chevron-back-circle-outline"
        ></ion-icon>
        <img
          onClick={() => {
            setImagePopup(true);
          }}
          className={styles["image"]}
          src={images[imageIndex]}
          alt=""
        />
        <ion-icon
          onClick={nextImageHandler}
          class={styles["right-swap"]}
          name="chevron-forward-circle-outline"
        ></ion-icon>
        <p className={styles["total-images"]}>
          {imageIndex + 1}/{images.length}
        </p>
      </div>
      {imagePopup && (
        <ImagePopup
          imageSrc={images[imageIndex]}
          closeImagePopup={closeImagePopup}
        />
      )}
    </Fragment>
  );
};

export default ImageSlider;

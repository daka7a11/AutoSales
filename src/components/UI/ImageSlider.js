import { Fragment, useState } from "react";
import styles from "./ImageSlider.module.css";

const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

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

  return (
    <Fragment>
      <div className={styles["slider-container"]}>
        <ion-icon
          onClick={prevImageHandler}
          class={styles["left-swap"]}
          name="chevron-back-circle-outline"
        ></ion-icon>
        <img className={styles["image"]} src={images[imageIndex]} alt="" />
        <ion-icon
          onClick={nextImageHandler}
          class={styles["right-swap"]}
          name="chevron-forward-circle-outline"
        ></ion-icon>
      </div>
    </Fragment>
  );
};

export default ImageSlider;

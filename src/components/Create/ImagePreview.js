import styles from "./ImagePreview.module.css";

const ImagePreview = ({ url }) => {
  return (
    <div className={styles["img-container"]}>
      <img className={styles["img-preview"]} alt="Car image" src={url} />
    </div>
  );
};

export default ImagePreview;

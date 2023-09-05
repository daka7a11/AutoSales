import styles from "./ImagePreview.module.css";

const ImagePreview = ({ url, imagePreviewClickHandler }) => {
  return (
    <div className={styles["img-container"]}>
      <img
        onClick={() => {
          imagePreviewClickHandler(url);
        }}
        className={styles["img-preview"]}
        alt="Car image"
        src={url}
      />
    </div>
  );
};

export default ImagePreview;

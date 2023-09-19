import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import useData from "../../hooks/useData";
import styles from "./Details.module.css";
import ImageSlider from "../UI/ImageSlider";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";

const Details = () => {
  const [vehicle, setVehicle] = useState({});
  const [likes, setLikes] = useState([]);

  const authContext = useAuthContext();

  const {
    getAdvertisement,
    deleteAdvertisement,
    likeAdvertisement,
    getAdvertisementLikes,
    deleteLike,
  } = useData();

  const { id } = useParams();

  const navigate = useNavigate();

  const user = authContext.getUserData();

  const isAuth = Boolean(user);

  const isOwner = isAuth && user?._id === vehicle._ownerId;

  const [isLiked, setIsLiked] = useState();

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedVehicle = await getAdvertisement(id);
      setVehicle(fetchedVehicle);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const likes = await getAdvertisementLikes(id);
      setLikes(likes);
      setIsLiked(isAuth && likes.some((x) => x._ownerId === user._id));
    }

    fetchData();
  }, [isLiked]);

  const likeClickHandler = async () => {
    if (isLiked) {
      return;
    }
    await likeAdvertisement(id);
    toast.warn(`Liked!`);
    setIsLiked(true);
  };

  const dislikeClickHandler = async () => {
    const like = likes.find((x) => x._ownerId === user._id);
    await deleteLike(like._id);
    toast.warn(`Disliked!`);
    setIsLiked(false);
  };

  const eidtClickHandler = () => {
    navigate("/edit/" + id);
  };

  const deleteHandler = async () => {
    if (!isOwner) {
      return;
    }

    await deleteAdvertisement(id);
    toast.warn(`Post deleted!`);
    navigate("/");
  };

  const userControls = isLiked ? (
    <ion-icon
      onClick={dislikeClickHandler}
      class={styles["control"]}
      name="heart-dislike-outline"
      title="Dislike"
    ></ion-icon>
  ) : (
    <ion-icon
      onClick={likeClickHandler}
      class={styles["control"]}
      name="heart-outline"
      title="Like"
    ></ion-icon>
  );

  const ownerControls = (
    <Fragment>
      <ion-icon
        onClick={eidtClickHandler}
        class={styles["control"]}
        name="create-outline"
      ></ion-icon>
      <ion-icon
        onClick={() => setDeleteModal(true)}
        class={styles["control"]}
        name="trash-outline"
      ></ion-icon>
    </Fragment>
  );

  const vehicleView = (
    <div className={styles["details-container"]}>
      <div className={styles["title-container"]}>
        <h2>{vehicle.title}</h2>
      </div>
      <div className={styles["image-slider"]}>
        <ImageSlider images={vehicle.images} />
      </div>
      <section className={styles["specifications"]}>
        <div className={styles["specification"]}>
          <span>Make:</span>
          <span className={styles["specification-detail"]}>{vehicle.make}</span>
        </div>
        <div className={styles["specification"]}>
          <span>Model:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.model}
          </span>
        </div>
        <div className={styles["specification"]}>
          <span>Fuel:</span>
          <span className={styles["specification-detail"]}>{vehicle.fuel}</span>
        </div>
        <div className={styles["specification"]}>
          <span>Gearbox:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.gearbox}
          </span>
        </div>
        <div className={styles["specification"]}>
          <span>Manufacturing date:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.manufacturing_date}
          </span>
        </div>
        <div className={styles["specification"]}>
          <span>Region:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.region}
          </span>
        </div>
        <div className={styles["specification"]}>
          <span>Horse power:</span>
          <span className={styles["specification-detail"]}>{vehicle.hp}</span>
        </div>
        <div className={styles["specification"]}>
          <span>Mileage:</span>
          <span className={styles["specification-detail"]}>
            {vehicle.mileage}
          </span>
        </div>
        <div
          className={`${styles["specification"]} ${styles["controls-price-container"]}`}
        >
          <div className={`${styles["controls"]} ${styles["additional"]}`}>
            {isAuth ? (isOwner ? ownerControls : userControls) : ""}
          </div>

          <div className={`${styles["additional"]}`}>
            Likes:{" "}
            <span className={styles["specification-detail"]}>
              {likes.length}
            </span>
          </div>

          <div className={`${styles["additional"]}`}>
            <span
              className={`${styles["specification-detail"]} ${styles["price"]}`}
            >
              ${vehicle.price}
            </span>
          </div>
        </div>
        <div className={`${styles["specification"]} ${styles["description"]}`}>
          <span className={styles["specification-detail"]}>
            {vehicle.description}
          </span>
        </div>
      </section>
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deleteHandler={deleteHandler}
        />
      )}
    </div>
  );

  return vehicle ? vehicleView : "";
};

export default Details;

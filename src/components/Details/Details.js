import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import useData from "../../hooks/useData";
import styles from "./Details.module.css";
import ImageSlider from "../UI/ImageSlider";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import Loader from "../UI/Loader";

const Details = () => {
  const {
    getAdvertisement,
    deleteAdvertisement,
    likeAdvertisement,
    getAdvertisementLikes,
    deleteLike,
  } = useData();
  const authContext = useAuthContext();

  const [vehicle, setVehicle] = useState({});
  const [isDataFetching, setIsDataFetching] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const user = authContext.getUserData();

  const isAuth = Boolean(user);

  const isOwner = isAuth && user?._id === vehicle.owner?._id;

  const [isLiked, setIsLiked] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsDataFetching(true);
      const fetchedVehicle = await getAdvertisement(id);
      setVehicle(fetchedVehicle);
      setIsDataFetching(false);
    }

    fetchData();
  }, [isLiked]);

  useEffect(() => {
    const isLike = isAuth && vehicle.likes?.some((x) => x === user._id);
    setIsLiked(isLike);
  }, [vehicle]);

  const likeClickHandler = async () => {
    if (isLiked) {
      return;
    }
    try {
      const updatedVehicle = await likeAdvertisement(id);
      toast.warn(`Liked.`);
      setIsLiked(true);
      //setVehicle(updatedVehicle); ? MISTERY : NOT WORKING PROPERLY WHEN INSERT THIS LINE
    } catch (e) {
      if (e.status === 400) {
        toast.warn(`Already liked.`);
        return;
      }
    }
  };

  const dislikeClickHandler = async () => {
    const updatedVehicle = await deleteLike(vehicle._id);
    toast.warn(`Disliked!`);
    setIsLiked(false);
    // setVehicle(updatedVehicle);
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
    <>
      {isDataFetching && <Loader />}
      {!isDataFetching && (
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
              <span className={styles["specification-detail"]}>
                {vehicle.make}
              </span>
            </div>
            <div className={styles["specification"]}>
              <span>Model:</span>
              <span className={styles["specification-detail"]}>
                {vehicle.model}
              </span>
            </div>
            <div className={styles["specification"]}>
              <span>Fuel:</span>
              <span className={styles["specification-detail"]}>
                {vehicle.fuel}
              </span>
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
                {vehicle.manufacturingDate?.slice(0, 7)}
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
              <span className={styles["specification-detail"]}>
                {vehicle.horsePower}
              </span>
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
                  {vehicle.likes?.length}
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
            <div
              className={`${styles["specification"]} ${styles["description"]}`}
            >
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
      )}
    </>
  );

  return vehicle ? vehicleView : "";
};

export default Details;

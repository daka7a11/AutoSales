import Cart from "../UI/Cart";
import styles from "./VehiclesList.module.css";

const VehiclesList = ({ vehicles }) => {
  return (
    <div className={`${styles["vehicles-carts-container"]} page-container`}>
      {vehicles.map((v) => (
        <Cart className={styles[""]} key={v._id} vehicle={v} />
      ))}
    </div>
  );
};

export default VehiclesList;

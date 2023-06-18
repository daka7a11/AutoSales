import Container from "../UI/Container";
import Cart from "../UI/Cart";
import styles from "./VehiclesList.module.css";

const VehiclesList = ({ vehicles }) => {
  return (
    <Container className={styles["vehicles-carts-container"]}>
      {vehicles.map((v) => (
        <Cart className={styles[""]} key={v.id} vehicle={v} />
      ))}
    </Container>
  );
};

export default VehiclesList;

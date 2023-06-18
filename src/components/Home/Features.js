import styles from "./Features.module.css";
import Container from "../UI/Container";
import Cart from "../UI/Cart";

const DUMMY_VEHICLES = [
  {
    id: 1,
    title: "Lamboghini Galardo",
    type: "Coupe",
    make: "Lamborghini",
    model: "Galardo",
    fuel: "Petrol",
    gearbox: "automatic",
    price: 5000,
    manufacturing_date: "2010",
    region: "Varna",
    hp: 300,
    mileage: 150000,
    img: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960",
  },
  {
    id: 2,
    title: "Golf 1.9 tdi",
    type: "Hatchback",
    make: "VW",
    model: "Golf",
    fuel: "Diesel",
    gearbox: "automatic",
    price: 5000,
    manufacturing_date: "2010",
    region: "Varna",
    hp: 300,
    mileage: 150000,
    img: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960",
  },
];

const Features = () => {
  return (
    <section id="features">
      <Container className={styles["features-container"]}>
        <div id="recently-added" className={styles["recently-added-container"]}>
          <h2 className={styles["container-title"]}>Recently added</h2>
          {DUMMY_VEHICLES.map((v) => (
            <Cart key={v.id} vehicle={v} />
          ))}
        </div>
        <div id="most-liked" className={styles["most-liked-container"]}>
          <h2 className={styles["container-title"]}>Most liked</h2>
          {DUMMY_VEHICLES.map((v) => (
            <Cart key={v.id} vehicle={v} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;

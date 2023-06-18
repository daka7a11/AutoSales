import { useReducer, useEffect } from "react";

import styles from "./Vehicles.module.css";

import SearchForm from "./SearchForm";
import Container from "../UI/Container";
import VehiclesList from "./VehiclesList";
import AppliedFilter from "./AppliedFilters";

const initialFilterReducerObj = {
  t: null,
  type: null,
  make: null,
  model: null,
  fuel: null,
  gearbox: null,
  price: {
    from: null,
    to: null,
  },
  year: {
    from: null,
    to: null,
  },
  region: null,
  power: {
    from: null,
    to: null,
  },
};

const filterReducer = (state, action) => {
  if (action.t === "SET_TYPE") {
    return {
      ...state,
      type: action.value,
    };
  }

  if (action.t === "SET_MAKE") {
    return {
      ...state,
      make: action.value,
    };
  }

  if (action.t === "SET_MODEL") {
    return {
      ...state,
      model: action.value,
    };
  }

  if (action.t === "SET_FUEL") {
    return {
      ...state,
      fuel: action.value,
    };
  }

  if (action.t === "SET_GEARBOX") {
    return {
      ...state,
      gearbox: action.value,
    };
  }

  if (action.t === "SET_REGION") {
    return {
      ...state,
      region: action.value,
    };
  }

  throw new Error("Invalid operation in filter reducer!");
};

const Vehicles = () => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterReducerObj
  );

  return (
    <Container className={styles["vehicles-container"]}>
      <h2
        onClick={() => console.log(filterState)}
        className={styles["heading"]}
      >
        Vehicles
      </h2>
      <SearchForm filterState={filterState} filterDispatch={filterDispatch} />
      <AppliedFilter
        filterState={filterState}
        filterDispatch={filterDispatch}
      />
      <VehiclesList vehicles={DUMMY_VEHICLES} />
    </Container>
  );
};

export default Vehicles;

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
  {
    id: 3,
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
  {
    id: 4,
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
  {
    id: 5,
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
  {
    id: 6,
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

import { useEffect, useReducer, useState } from "react";

import styles from "./Vehicles.module.css";

import SearchForm from "./SearchForm";
import VehiclesList from "./VehiclesList";
import AppliedFilter from "./AppliedFilters";
import useData from "../../hooks/useData";
import Loader from "../UI/Loader";

const initialFilterReducerObj = {
  t: null,
  type: null,
  make: null,
  model: null,
  fuel: null,
  gearbox: null,
  price: {
    from: "",
    to: "",
  },
  year: {
    from: new Date("1950"),
    to: new Date("2024"),
  },
  region: null,
  power: {
    from: "",
    to: "",
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

  if (action.t === "SET_PRICE") {
    let fromPrice = action.value.from;
    let toPrice = action.value.to;

    if (toPrice && fromPrice === "") {
      fromPrice = 0;
    }

    return {
      ...state,
      price: {
        from: fromPrice,
        to: toPrice,
      },
    };
  }

  if (action.t === "SET_FROM_YEAR") {
    return {
      ...state,
      year: {
        ...state.year,
        from: action.value,
      },
    };
  }

  if (action.t === "SET_TO_YEAR") {
    return {
      ...state,
      year: {
        ...state.year,
        to: action.value,
      },
    };
  }

  if (action.t === "SET_POWER") {
    let fromPower = action.value.from;
    let toPower = action.value.to;

    if (toPower && fromPower === "") {
      fromPower = 0;
    }

    return {
      ...state,
      power: {
        from: fromPower,
        to: toPower,
      },
    };
  }

  if (action.t === "REMOVE_FILTER") {
    if (action.value === "type") {
      return { ...state, type: null };
    }
    if (action.value === "make") {
      return { ...state, make: null, model: null };
    }
    if (action.value === "model") {
      return { ...state, model: null };
    }
    if (action.value === "fuel") {
      return { ...state, fuel: null };
    }
    if (action.value === "gearbox") {
      return { ...state, gearbox: null };
    }
    if (action.value === "price") {
      return {
        ...state,
        price: {
          from: "",
          to: "",
        },
      };
    }
    if (action.value === "year") {
      return {
        ...state,
        year: {
          from: new Date("1950"),
          to: new Date("2024"),
        },
      };
    }

    if (action.value === "region") {
      return { ...state, region: null };
    }

    if (action.value === "power") {
      return {
        ...state,
        power: {
          from: "",
          to: "",
        },
      };
    }
  }

  throw new Error("Invalid operation in filter reducer!");
};

const Vehicles = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(false);

  const { getAdvertisements } = useData();

  useEffect(() => {
    async function fetchData() {
      setIsDataFetching(true);

      const data = await getAdvertisements();
      setAdvertisements(data);
      setIsDataFetching(false);
    }

    fetchData();
  }, []);

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterReducerObj
  );

  const applyAllFilters = (vehicles) => {
    let filteredVehicles = [...vehicles];
    filteredVehicles = filteredVehicles.filter((x) =>
      filterState.type ? filterState.type === x.type : true
    );

    filteredVehicles = filteredVehicles.filter((x) =>
      filterState.make ? filterState.make === x.make : true
    );

    filteredVehicles = filteredVehicles.filter((x) =>
      filterState.fuel ? filterState.fuel === x.fuel : true
    );

    filteredVehicles = filteredVehicles.filter((x) =>
      filterState.gearbox ? filterState.gearbox === x.gearbox : true
    );

    if (filterState.price.from || filterState.price.to) {
      if (filterState.price.from) {
        if (filterState.price.to) {
          filteredVehicles = filteredVehicles.filter(
            (x) =>
              x.price >= filterState.price.from &&
              x.price <= filterState.price.to
          );
        } else {
          filteredVehicles = filteredVehicles.filter(
            (x) => x.price >= filterState.price.from
          );
        }
      }

      if (filterState.price.to && !filterState.price.from) {
        filteredVehicles = filteredVehicles.filter(
          (x) => x.price <= filterState.price.to
        );
      }
    }

    filteredVehicles = filteredVehicles.filter((x) => {
      const manufacturingYear = Number(x.manufacturingDate.split("-")[0]);
      const minYear = filterState.year.from.getFullYear();
      const maxYear = filterState.year.to.getFullYear();

      return manufacturingYear >= minYear && manufacturingYear <= maxYear;
    });

    filteredVehicles = filteredVehicles.filter((x) =>
      filterState.region ? filterState.region === x.region : true
    );

    if (filterState.power.from || filterState.power.to) {
      if (filterState.power.from) {
        if (filterState.power.to) {
          filteredVehicles = filteredVehicles.filter(
            (x) =>
              x.horsePower >= filterState.power.from &&
              x.horsePower <= filterState.power.to
          );
        } else {
          filteredVehicles = filteredVehicles.filter(
            (x) => x.horsePower >= filterState.power.from
          );
        }
      }

      if (filterState.power.to && !filterState.power.from) {
        filteredVehicles = filteredVehicles.filter(
          (x) => x.horsePower <= filterState.power.to
        );
      }
    }

    return filteredVehicles;
  };

  return (
    <div className={`${styles["vehicles-container"]} page-container`}>
      <h2 className={styles["heading"]}>Vehicles</h2>
      <SearchForm filterState={filterState} filterDispatch={filterDispatch} />
      <AppliedFilter
        filterState={filterState}
        filterDispatch={filterDispatch}
      />
      {isDataFetching && <Loader />}
      {!isDataFetching && (
        <VehiclesList vehicles={applyAllFilters(advertisements)} />
      )}
    </div>
  );
};

export default Vehicles;

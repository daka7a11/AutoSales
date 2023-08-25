import { useEffect, useReducer, useState } from "react";

import styles from "./Vehicles.module.css";

import SearchForm from "./SearchForm";
import VehiclesList from "./VehiclesList";
import AppliedFilter from "./AppliedFilters";
import useData from "../../hooks/useData";

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
    to: new Date("2023"),
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
          to: new Date("2023"),
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

  const { getAdvertisements } = useData();

  useEffect(() => {
    async function fetchData() {
      const data = await getAdvertisements();
      setAdvertisements(data);
    }

    fetchData();
  }, []);

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterReducerObj
  );

  return (
    <div className={`${styles["vehicles-container"]} page-container`}>
      <h2 className={styles["heading"]}>Vehicles</h2>
      <SearchForm filterState={filterState} filterDispatch={filterDispatch} />
      <AppliedFilter
        filterState={filterState}
        filterDispatch={filterDispatch}
      />
      <VehiclesList vehicles={advertisements} />
    </div>
  );
};

export default Vehicles;

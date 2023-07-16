import { useState, useEffect } from "react";

import styles from "./SearchForm.module.css";
import { Fragment } from "react";
import FilterPopup from "./FilterPopup";

import useRequest from "../../hooks/useRequest";

const endPoints = {
  makesModels: "/data/vehicles",
  regions: "/data/regions",
};

const SearchForm = ({ filterState, filterDispatch }) => {
  const request = useRequest();
  useEffect(() => {
    async function fetchData() {
      const makesModels = Object.values(
        await request.get(endPoints.makesModels)
      );

      setMakesModels(makesModels);

      const regions = Object.values(await request.get(endPoints.regions)).map(
        (r) => r.name
      );
      setRegions(regions);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const selectedMakeModels = makesModels.find(
      (mm) => mm.brand === filterState.make
    );
    if (!selectedMakeModels) {
      return;
    }
    console.log(selectedMakeModels);
    console.log(filterState);
    setModels(selectedMakeModels.models);
  }, [filterState.make]);

  const [filterPopup, setFilterPopup] = useState("");
  const [makesModels, setMakesModels] = useState([]);
  const [models, setModels] = useState([]);
  const [regions, setRegions] = useState([]);

  const popupCollectionItems = {
    Type: [
      "Van",
      "SUV",
      "Cabrio",
      "Wagon",
      "Coupe",
      "Minivan",
      "Sedan",
      "Hatchback",
      "Pickup",
    ],
    Make: makesModels.map((v) => v.brand),
    Model: models,
    Fuel: ["Petrol", "Diesel", "Hybrid", "Electric"],
    Gearbox: ["Manual", "Automatic"],
    Region: regions,
  };

  return (
    <Fragment>
      <div className={styles["search-container"]}>
        <span
          className={`${styles["btn--search"]}`}
          onClick={() => setFilterPopup("Type")}
        >
          Type
        </span>
        <span
          className={`${styles["btn--search"]}`}
          onClick={() => setFilterPopup("Make")}
        >
          Make
        </span>
        {filterState.make && (
          <span
            className={`${styles["btn--search"]}`}
            onClick={() => setFilterPopup("Model")}
          >
            Model
          </span>
        )}

        <span
          className={`${styles["btn--search"]}`}
          onClick={() => setFilterPopup("Fuel")}
        >
          Fuel
        </span>
        <span
          className={`${styles["btn--search"]}`}
          onClick={() => setFilterPopup("Gearbox")}
        >
          Gearbox
        </span>
        <span
          className={`${styles["btn--search"]}`}
          onClick={() => setFilterPopup("Price")}
        >
          Price
        </span>
        <span
          className={`${styles["btn--search"]}`}
          onClick={() => setFilterPopup("Year")}
        >
          Year
        </span>
        <span
          className={`${styles["btn--search"]}`}
          onClick={() => setFilterPopup("Region")}
        >
          Region
        </span>
        <span
          className={`${styles["btn--search"]}`}
          onClick={() => setFilterPopup("Power")}
        >
          Power
        </span>
      </div>
      {filterPopup && (
        <FilterPopup
          type={filterPopup}
          setFilterPopup={setFilterPopup}
          items={popupCollectionItems[filterPopup]}
          filterState={filterState}
          filterDispatch={filterDispatch}
        />
      )}
    </Fragment>
  );
};

export default SearchForm;

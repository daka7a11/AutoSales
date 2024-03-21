import styles from "./SearchForm.module.css";
import { vehicleTypes, fuel, gearbox } from "../../util.js";

import { useState, useEffect } from "react";
import { Fragment } from "react";

import FilterPopup from "./FilterPopup";
import useData from "../../hooks/useData";

const SearchForm = ({ filterState, filterDispatch }) => {
  const { getMakesModels, getRegions } = useData();
  useEffect(() => {
    async function fetchData() {
      const makesModels = await getMakesModels();
      setMakesModels(makesModels);

      const regions = (await getRegions()).map((r) => r.name);
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
    setModels(selectedMakeModels.models);
  }, [filterState.make]);

  const [filterPopup, setFilterPopup] = useState("");
  const [makesModels, setMakesModels] = useState([]);
  const [models, setModels] = useState([]);
  const [regions, setRegions] = useState([]);

  const popupCollectionItems = {
    Type: vehicleTypes,
    Make: makesModels.map((v) => v.brand),
    Model: models,
    Fuel: fuel,
    Gearbox: gearbox,
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

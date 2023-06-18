import { useState, Fragment } from "react";

import styles from "./FilterPopup.module.css";

const FilterPopup = ({ type, setFilterPopup, items, filterDispatch }) => {
  const onMakeSelectHandler = (e) => {
    filterDispatch({ t: "SET_MAKE", value: e.target.dataset.value });
    setFilterPopup("");
  };

  const onTypeSelectHandler = (e) => {
    filterDispatch({ t: "SET_TYPE", value: e.target.dataset.value });
    setFilterPopup("");
  };

  const onModelSelectHandler = (e) => {
    filterDispatch({ t: "SET_MODEL", value: e.target.dataset.value });
    setFilterPopup("");
  };

  const onFuelSelectHandler = (e) => {
    filterDispatch({ t: "SET_FUEL", value: e.target.dataset.value });
    setFilterPopup("");
  };

  const onGearboxSelectHandler = (e) => {
    filterDispatch({ t: "SET_GEARBOX", value: e.target.dataset.value });
    setFilterPopup("");
  };

  const onRegionSelectHandler = (e) => {
    filterDispatch({ t: "SET_REGION", value: e.target.dataset.value });
    setFilterPopup("");
  };

  const hidePopupHandler = (e) => {
    if (e.target.id === "popup-container" || e.target.id === "cancel") {
      setFilterPopup("");
    }
  };

  const popupInputs = {
    Type: (
      <Fragment>
        {items.sort().map((r) => (
          <span
            onClick={onTypeSelectHandler}
            className={styles["filter-item"]}
            key={r}
            data-value={r}
          >
            {r}
          </span>
        ))}
      </Fragment>
    ),
    Make: (
      <Fragment>
        {items.sort().map((m) => (
          <span
            onClick={onMakeSelectHandler}
            className={styles["filter-item"]}
            key={m}
            data-value={m}
          >
            {m}
          </span>
        ))}
      </Fragment>
    ),
    Model: (
      <Fragment>
        {items.sort().map((m) => (
          <span
            onClick={onModelSelectHandler}
            className={styles["filter-item"]}
            key={m}
            data-value={m}
          >
            {m}
          </span>
        ))}
      </Fragment>
    ),
    Fuel: (
      <Fragment>
        {items.map((m) => (
          <span
            onClick={onFuelSelectHandler}
            className={styles["filter-item"]}
            key={m}
            data-value={m}
          >
            {m}
          </span>
        ))}
      </Fragment>
    ),
    Gearbox: (
      <Fragment>
        {items.map((m) => (
          <span
            onClick={onGearboxSelectHandler}
            className={styles["filter-item"]}
            key={m}
            data-value={m}
          >
            {m}
          </span>
        ))}
      </Fragment>
    ),
    Region: (
      <Fragment>
        {items.map((m) => (
          <span
            onClick={onRegionSelectHandler}
            className={styles["filter-item"]}
            key={m}
            data-value={m}
          >
            {m}
          </span>
        ))}
      </Fragment>
    ),
  };

  return (
    <div
      id="popup-container"
      className={styles["popup-container"]}
      onClick={hidePopupHandler}
    >
      <div className={styles["popup"]}>
        <h3 className={styles["popup-heading"]}>{type}</h3>
        <div className={styles["popup-content"]}>{popupInputs[type]}</div>
        <div className={styles["popup-actions"]}>
          <button
            className={`btn ${styles["btn-popup"]} ${styles["btn-cancel"]}`}
            onClick={hidePopupHandler}
            id="cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;

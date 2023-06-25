import { useState, Fragment } from "react";

import styles from "./FilterPopup.module.css";

const FilterPopup = ({
  type,
  setFilterPopup,
  items,
  filterState,
  filterDispatch,
}) => {
  const [fromPrice, setFromPrice] = useState(filterState.price.from);
  const [toPrice, setToPrice] = useState(filterState.price.to);

  const [fromPower, setFromPower] = useState(filterState.power.from);
  const [toPower, setToPower] = useState(filterState.power.to);

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

  const onPriceSelectHandler = (e) => {
    filterDispatch({ t: "SET_PRICE", value: { from: fromPrice, to: toPrice } });
    setFilterPopup("");
  };

  const onFromYearChangeHandler = (e) => {
    filterDispatch({
      t: "SET_FROM_YEAR",
      value: new Date(e.target.value.toString()),
    });
    // setFilterPopup("");
  };

  const onToYearChangeHandler = (e) => {
    filterDispatch({
      t: "SET_TO_YEAR",
      value: new Date(e.target.value.toString()),
    });
    // setFilterPopup("");
  };

  const onPowerSelectHandler = (e) => {
    filterDispatch({ t: "SET_POWER", value: { from: fromPower, to: toPower } });
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
        {items?.sort()?.map((r) => (
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
        {items?.sort()?.map((m) => (
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
        {items?.sort()?.map((m) => (
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
        {items?.map((m) => (
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
        {items?.map((m) => (
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
    Price: (
      <Fragment>
        <div className={styles["form-container"]}>
          <div className={styles["input-section"]}>
            <label htmlFor="price-from">From</label>
            <input
              onChange={(e) => {
                setFromPrice(e.target.value);
              }}
              id="price-from"
              name="price-from"
              type="number"
              min="0"
              step="100"
              value={fromPrice}
            />
          </div>
          <div className={styles["input-section"]}>
            <label htmlFor="price-to">To</label>
            <input
              onChange={(e) => {
                setToPrice(e.target.value);
              }}
              id="price-to"
              name="price-to"
              type="number"
              min="0"
              step="100"
              value={toPrice}
            />
          </div>

          <div className={styles["input-section"]}>
            <button
              className={`btn ${styles["btn-popup"]} ${styles["btn-apply"]}`}
              onClick={onPriceSelectHandler}
              id="apply"
            >
              Apply
            </button>
          </div>
        </div>
      </Fragment>
    ),
    Year: (
      <Fragment>
        <div className={styles["form-container"]}>
          <div className={styles["input-section"]}>
            <label htmlFor="year-from">From</label>
            <input
              className={styles["range"]}
              onChange={onFromYearChangeHandler}
              id="year-from"
              name="year-from"
              type="range"
              min="1950"
              max={filterState.year.to.getFullYear()}
              value={filterState.year.from.getFullYear()}
            />
            <label>{filterState.year.from.getFullYear()}</label>
          </div>
          <div className={styles["input-section"]}>
            <label htmlFor="year-to">To</label>
            <input
              className={styles["range"]}
              onChange={onToYearChangeHandler}
              id="year-to"
              name="year-to"
              type="range"
              min={filterState.year.from.getFullYear()}
              max="2023"
              value={filterState.year.to.getFullYear()}
            />
            <label>{filterState.year.to.getFullYear()}</label>
          </div>
        </div>
      </Fragment>
    ),
    Region: (
      <Fragment>
        {items?.map((m) => (
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
    Power: (
      <Fragment>
        <div className={styles["form-container"]}>
          <div className={styles["input-section"]}>
            <label htmlFor="power-from">From</label>
            <input
              onChange={(e) => {
                setFromPower(e.target.value);
              }}
              id="power-from"
              name="power-from"
              type="number"
              min="0"
              step="10"
              value={fromPower}
            />
          </div>
          <div className={styles["input-section"]}>
            <label htmlFor="power-to">To</label>
            <input
              onChange={(e) => {
                setToPower(e.target.value);
              }}
              id="power-to"
              name="power-to"
              type="number"
              min="0"
              step="10"
              value={toPower}
            />
          </div>

          <div className={styles["input-section"]}>
            <button
              className={`btn ${styles["btn-popup"]} ${styles["btn-apply"]}`}
              onClick={onPowerSelectHandler}
              id="apply"
            >
              Apply
            </button>
          </div>
        </div>
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

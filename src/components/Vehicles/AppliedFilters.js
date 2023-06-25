import styles from "./AppliedFilters.module.css";
import htmlParser from "html-react-parser";

const AppliedFilter = ({ filterState, filterDispatch }) => {
  let price = null;
  let year = null;
  let power = null;

  if (filterState.price.from !== "" && filterState.price.to !== "") {
    price = `${filterState.price.from}$ - ${filterState.price.to}$`;
  } else if (filterState.price.from !== "" && filterState.price.to === "") {
    price = `${filterState.price.from}$ - <span class='infinite-icon'>&infin;</span>`;
  } else if (filterState.price.from === "" && filterState.price.to !== "") {
    price = `0 - ${filterState.price.to}$`;
  }

  if (filterState.year.from && filterState.year.to) {
    year = `${filterState.year.from.getFullYear()} - ${filterState.year.to.getFullYear()}`;
    if (year === "1950 - 2023") {
      year = null;
    }
  } else if (filterState.year.from && filterState.year.to === null) {
    year = `${filterState.year.from.getFullYear()} - <span class='infinite-icon'>&infin;</span>`;
  } else if (filterState.year.from === null && filterState.year.to) {
    year = `<span class='infinite-icon'>&infin;</span> - ${filterState.year.to.getFullYear()}`;
  }

  if (filterState.power.from !== "" && filterState.power.to !== "") {
    power = `${filterState.power.from} HP - ${filterState.power.to} HP`;
  } else if (filterState.power.from !== "" && filterState.power.to === "") {
    power = `${filterState.power.from} HP - <span class='infinite-icon'>&infin;</span>`;
  } else if (filterState.power.from === "" && filterState.power.to !== "") {
    power = `0 - ${filterState.power.to} HP`;
  }

  const filters = {
    ...filterState,
    price: price,
    year: year,
    power: power,
  };

  const filtersArr = Object.entries(filters).reduce((acc, curr) => {
    const [key, value] = curr;
    return acc.concat({ key, value });
  }, []);

  return (
    <div className={styles["applied-filters"]}>
      {filtersArr.map(
        (f) =>
          f.value && (
            <span
              onClick={(e) => {
                filterDispatch({
                  t: "REMOVE_FILTER",
                  value: e.target.dataset.type,
                });
              }}
              key={f.key}
              className={styles["applied-filter"]}
              data-type={f.key}
            >
              {`${f.key}: `}
              {htmlParser(f.value)}
            </span>
          )
      )}
    </div>
  );
};

export default AppliedFilter;

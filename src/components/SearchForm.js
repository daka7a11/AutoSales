const SearchForm = () => {
  return (
    <form>
      <div>
        <div>
          <label>Make</label>
          <select></select>
        </div>
        <div>
          <label>Model</label>
          <select></select>
        </div>
        <div>
          <label>Date</label>
          <input type="date" min="1950-01-01" max="2022-12-31" />
        </div>
        <div>
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" />
        </div>
        <div>
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" />
        </div>
        <div>
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" />
        </div>
        <div>
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" />
        </div>
      </div>
      <div>
        <button type="submit">Search</button>
        <button type="button">Close</button>
      </div>
    </form>
  );
};

export default SearchForm;

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">find countries </label>
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;

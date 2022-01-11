const Filter = ({ handleFilterName, filterName }) => {
  return (
    <div>
      filter shown with:{' '}
      {<input value={filterName} onChange={handleFilterName} />}
    </div>
  );
};

export default Filter;

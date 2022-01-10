import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCountries, setfilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

    if (filter) {
      const regex = new RegExp(filter, 'i');
      const countriesFilter = countries.filter((country) =>
        country.name.common.match(regex)
      );
      setfilteredCountries(countriesFilter);
    }
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList filter={filter} filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;

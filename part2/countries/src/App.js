import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const showCountry = (country) => {
    setFilter(country);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList
        filter={filter}
        filteredCountries={filteredCountries}
        showCountry={showCountry}
      />
    </div>
  );
}

export default App;

import CountryDetail from './CountryDetail';

const CountryList = ({ filter, filteredCountries, showCountry }) => {
  // display only when filter is not empty
  if (filter !== '') {
    // when there's only one country country
    if (filteredCountries.length === 1) {
      return <CountryDetail country={filteredCountries[0]} />;
      // when there are more then 10 countries
    } else if (
      filteredCountries.length <= 10 &&
      filteredCountries.length >= 2
    ) {
      return filteredCountries.map((country) => (
        <li key={country.cca3}>
          <span>{country.name.common}</span>
          <button onClick={() => showCountry(country.name.common)}>show</button>
        </li>
      ));
      // when there are more then 10 countries
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  }

  return <p></p>;
};

export default CountryList;

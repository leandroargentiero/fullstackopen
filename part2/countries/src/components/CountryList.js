import CountryDetail from './CountryDetail';

const CountryList = ({ filteredCountries }) => {
  // when there are more then 10 countries
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  // when countries is between 1 and 10
  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return filteredCountries.map((country) => (
      <li key={country.cca3}>{country.name.common}</li>
    ));
  }

  // when there's only one country country
  if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />;
  }

  return filteredCountries.map((country) => (
    <li key={country.cca3}>{country.name.common}</li>
  ));
};

export default CountryList;

const CountryDetail = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <p style={{ fontSize: '100px', margin: '0' }}>{country.flag}</p>
    </>
  );
};

export default CountryDetail;

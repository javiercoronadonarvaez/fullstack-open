const Country = ({ country }) => {
  if (country.display === null || country.display === false) {
    return (
      <div>
        <p>{country.name}</p>
      </div>
    )
  }
  else {
    const languageValues = Object.values(country.languages)
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {languageValues.map(language => <li>{language}</li>)}
        </ul>
        <h2>Flag</h2>
        <img src={country.flag} />
      </div>
    )
  }
}

export default Country
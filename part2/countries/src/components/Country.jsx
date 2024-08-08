const Country = ({ country, changeDisplayStatus }) => {
  if (!country.display) {
    if (country.name === 'Too many matches, specify another filter') {
      return (
        <div>
          <p>{country.name}</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <p>{country.name}</p>
          <button onClick={changeDisplayStatus}>Show Details</button>
        </div>
      )
    }
  }
  else {
    console.log('Country Parameter: ', country)
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
        <h2>Weather in {country.capital}</h2>
        <p>Main Conditions: {country.weatherData.main}</p>
        <p>Temperature: {country.weatherData.temperature} °F</p>
        <p>Wind Speed: {country.weatherData.windSpeed} m/s</p>
      </div>
    )
  }
}

export default Country
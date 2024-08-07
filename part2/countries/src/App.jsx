import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import countriesService from './services/countries'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [countryToDisplay, setCountryToDisplay] = useState([])

  const searchAllHook = () => {
    if (searchValue !== '') {
      countriesService
        .getAll()
        .then(allCountries => filterResultsFromSearchValue(allCountries))
    }
    else {
      setCountries([])
      return ;
    }
  }

  useEffect(searchAllHook, [searchValue])

  const determineDisplayLogic = (countriesList) => {
    if (countriesList.length > 10) {
      const countriesDisplayStatus = [{ name: 'Too many matches, specify another filter', display: null }]
      setCountries(countriesDisplayStatus)
    }
    else if (countriesList.length > 1 && countriesList.length < 11) {
      const countriesDisplayStatus = countriesList.map(country => ({ name: country, display: false }))
      setCountries(countriesDisplayStatus)
    }
    else {
      countriesService
        .getSingleCountry(countriesList[0])
        .then(country => setCountries([{ name: country.name.common, display: true, capital: country.capital, area: country.area, languages: country.languages, flag: country.flags.png }]))
    }
  }

  const filterResultsFromSearchValue = (allCountries) => {
    const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))
    const filteredCountriesNames = filteredCountries.map(country => country.name.common)
    determineDisplayLogic(filteredCountriesNames)
  }

  const handleSearchChange = (event) => {
    console.log('Captured Filter: ', )
    setSearchValue(event.target.value)
  }

  return (
    <>
      <Filter searchValue={searchValue} handleSearchValue={handleSearchChange} />
      {countries.map(country => <Country country={country} />)}
    </>
  )
}

export default App

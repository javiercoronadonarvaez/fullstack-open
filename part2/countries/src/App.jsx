import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import countriesService from './services/countries'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [allCountriesList, setallCountriesList] = useState([])
  const [countries, setCountries] = useState([])
  const [displayCountry, setDisplayCountry] = useState([])

  const createAllCountriesList = (allCountries) => {
    const filteredCountriesNames = allCountries.map(country => ({ name: country.name.common, display: false }))
    setallCountriesList(filteredCountriesNames)
    setCountries(countries)
  }

  const searchAllHook = () => {
    countriesService
      .getAll()
      .then(allCountries => createAllCountriesList(allCountries))
  }

  useEffect(searchAllHook, [])

  const filterResultsHook = () => {
    if (searchValue !== '') {
      const filteredCountries = allCountriesList.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
      console.log('Filtered Countries: ', filteredCountries)
      determineDisplayLogic(filteredCountries)
    }
    else {
      setCountries([])
    }
  }

  useEffect(filterResultsHook, [searchValue])

  const determineDisplayLogic = (countriesList) => {
    if (countriesList.length > 10) {
      const countriesDisplayStatus = [{ name: 'Too many matches, specify another filter', display: false }]
      setCountries(countriesDisplayStatus)
    }
    else if (countriesList.length > 1 && countriesList.length < 11) {
      setCountries(countriesList)
    }
    else if (countriesList.length > 0) {
      console.log('Single Filtered Country', countriesList[0])
      countriesService
        .getSingleCountry(countriesList[0].name)
        .then(country => setCountries([{ name: country.name.common, display: true, capital: country.capital, area: country.area, languages: country.languages, flag: country.flags.png }]))
    }
  }

  const handleSearchChange = (event) => {
    console.log('Captured Filter: ', event.target.value)
    setSearchValue(event.target.value)
  }

  const updateCountriesStatusFunction = () => {
    console.log('Updated Country: ', displayCountry)
    const updatedCountries = countries.map(country => 
      country.name === displayCountry.name 
      ? displayCountry
      : country )
    console.log('Show Updated Countries: ', updatedCountries)
    setCountries(updatedCountries)
  }

  useEffect(updateCountriesStatusFunction, [displayCountry])

  const showCountryDetails = (countryName) => {
    const selectedCountry = countries.find(country => country.name === countryName)
    const displayChange = !selectedCountry.display
    console.log('Show Display Countries: ', countries)
    countriesService
      .getSingleCountry(countryName)
      .then(country => setDisplayCountry({ name: country.name.common, display: displayChange, capital: country.capital, area: country.area, languages: country.languages, flag: country.flags.png }))
  }

  return (
    <>
      <Filter searchValue={searchValue} handleSearchValue={handleSearchChange} />
      {countries.map(country => <Country country={country} changeDisplayStatus={() => showCountryDetails(country.name)} />)}
    </>
  )
}

export default App
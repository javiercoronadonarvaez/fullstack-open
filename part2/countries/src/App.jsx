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
    const filteredCountriesNames = allCountries.map((country, index) => ({ name: country.name.common, display: false, id: index + 1 }))
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
      const countriesDisplayStatus = [{ name: 'Too many matches, specify another filter', display: false, id: 0 }]
      setCountries(countriesDisplayStatus)
    }
    else if (countriesList.length > 1 && countriesList.length < 11) {
      setCountries(countriesList)
    }
    else if (countriesList.length > 0) {
      const selectedCountry = allCountriesList.find(country => country.name === countriesList[0].name)
      console.log('Single Filtered Country', selectedCountry)
      countriesService
        .getSingleCountry(selectedCountry.name)
        .then(country => setCountries([{ name: country.name.common, display: true, capital: country.capital, area: country.area, languages: country.languages, flag: country.flags.png, id: selectedCountry.id }]))
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
    const countryId = selectedCountry.id
    console.log('Show Display Countries: ', countries)
    countriesService
      .getSingleCountry(countryName)
      .then(country => setDisplayCountry({ name: country.name.common, display: displayChange, capital: country.capital, area: country.area, languages: country.languages, flag: country.flags.png, id: countryId }))
  }

  return (
    <>
      <Filter searchValue={searchValue} handleSearchValue={handleSearchChange} />
      {countries.map(country => <Country key={country.id} country={country} changeDisplayStatus={() => showCountryDetails(country.name)} />)}
    </>
  )
}

export default App
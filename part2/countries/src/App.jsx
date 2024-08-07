import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import countriesService from './services/countries'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
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

  useEffect(hook, [searchValue])

  const determineDisplayLogic = (countriesList) => {
    if (countriesList.length > 10) {
      const displayedList = ['Too many matches, specify another filter']
      return displayedList
    }
    else {
      return countriesList
    }
  }

  const filterResultsFromSearchValue = (allCountries) => {
    const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))
    const filteredCountriesNames = filteredCountries.map(country => country.name.common)
    const displayedList = determineDisplayLogic(filteredCountriesNames)
    setCountries(displayedList)
  }

  const handleSearchChange = (event) => {
    console.log('Captured Filter: ', )
    setSearchValue(event.target.value)
  }

  return (
    <>
      <Filter searchValue={searchValue} handleSearchValue={handleSearchChange} />
      {countries.map((country, index) => <Country key={index} country={country} />)}
    </>
  )
}

export default App

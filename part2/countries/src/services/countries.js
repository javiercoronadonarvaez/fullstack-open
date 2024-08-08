import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const getLatAndLonBaseUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
const getWeatherDataBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getAll = () => {
  const request = axios.get(allCountriesUrl)
  return request.then(response => response.data)
}

const getSingleCountry = (countryName) => {
  const request = axios.get(`${baseUrl}/${countryName}`)
  return request.then(response => response.data)
}

const getLatAndLon = (capitalName) => {
  const request = axios.get(`${getLatAndLonBaseUrl}${capitalName}&appid=${api_key}`)
  return request.then(response => response.data)
}

const getWeatherData = (lat, lon) => {
  const request = axios.get(`${getWeatherDataBaseUrl}lat=${lat}&lon=${lon}&appid=${api_key}`)
  return request.then(response => response.data)
}

export default { getAll, getSingleCountry, getLatAndLon, getWeatherData }
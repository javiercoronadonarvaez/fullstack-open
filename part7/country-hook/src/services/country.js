import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseCountryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getCountry = async (countryName) => {
  const countryUrl = `${baseCountryUrl}/${countryName}`;
  const response = await axios.get(countryUrl);
  return response;
};

export default { getAll, getCountry };

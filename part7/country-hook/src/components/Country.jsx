const Country = ({ country }) => {
  console.log("Retrieved country", country);
  if (country) {
    return (
      <div>
        <h3>{country.data.name.common} </h3>
        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div>
        <img
          src={country.data.flags.png}
          height="100"
          alt={`flag of ${country.data.name}`}
        />
      </div>
    );
  }
};

export default Country;

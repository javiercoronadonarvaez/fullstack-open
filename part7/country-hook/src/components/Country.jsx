const Country = ({ country }) => {
  console.log("Retrieved country", country);
  if (country) {
    return (
      <div>
        <h3>{country.name.common} </h3>
        <div>capital {country.capital} </div>
        <div>population {country.population}</div>
        <img
          src={country.flags.png}
          height="100"
          alt={`flag of ${country.name}`}
        />
      </div>
    );
  }
};

export default Country;

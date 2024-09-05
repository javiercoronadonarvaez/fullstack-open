import React, { useEffect, useState } from "react";
import Country from "./components/Country";
import Notification from "./components/Notification";
import { useField, useCountry } from "./hooks";
import countriesService from "./services/country";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const [notification, setNotification] = useState("");
  const country = useCountry();

  useEffect(() => {
    if (name) {
      countriesService
        .getCountry(name)
        .then((retrievedCountry) => {
          country.setCountry(retrievedCountry);
          setNotification("");
        })
        .catch((error) => {
          setNotification(error);
          country.setCountry("");
        });
    }
  }, [name]);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>
      <Notification error={notification} />
      <Country country={country.country} />
    </div>
  );
};

export default App;

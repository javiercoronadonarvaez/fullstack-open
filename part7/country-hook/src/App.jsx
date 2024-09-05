import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Country from "./components/Country";
import Notification from "./components/Notification";
import { useField, useCountry } from "./hooks";
import countriesService from "./services/country";
import { updateName } from "./reducers/nameReducer";

const App = () => {
  const nameInput = useField("text");
  //const [name, setName] = useState("");
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
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

  const fetch = (event) => {
    event.preventDefault();
    // setName(nameInput.value);
    dispatch(updateName(nameInput.value));
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

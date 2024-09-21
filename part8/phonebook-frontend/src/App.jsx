import { useQuery, useApolloClient } from "@apollo/client";
import { useState } from "react";
import { ALL_PERSONS } from "./queries";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <Notification errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  );
};

export default App;

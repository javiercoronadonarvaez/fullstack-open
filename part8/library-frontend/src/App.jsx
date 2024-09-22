import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
// import Books from "./components/Books";
import Books from "./components/BooksTest";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <LoginForm
          show={page === "login"}
          setToken={setToken}
          setPage={setPage}
        />
      </>
    );
  }

  const showLogin = token ? { display: "none" } : { display: "" };
  const showLogout = token ? { display: "" } : { display: "none" };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button style={showLogin} onClick={() => setPage("login")}>
          login
        </button>
        <button style={showLogout} onClick={logout}>
          logout
        </button>
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommendations show={page === "recommend"} />
    </div>
  );
};

export default App;

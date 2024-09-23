import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(
        `New Book ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name} added`
      );
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <h2>Login Homepage</h2>
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

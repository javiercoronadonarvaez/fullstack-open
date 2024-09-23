import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import {
  BOOK_ADDED,
  ALL_BOOKS,
  ALL_AUTHORS,
  FILTER_BOOKS_BY_GENRE,
} from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const newBook = data.data.bookAdded;
      window.alert(`New Book ${newBook.title} by ${newBook.author.name} added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        console.log("All BOOKS", allBooks);
        return {
          allBooks: allBooks.concat(newBook),
        };
      });

      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        console.log("All AUTHORS", allAuthors);
        const author = data.data.bookAdded.author;
        const existingAuthors = allAuthors.map((author) => author.name);
        if (existingAuthors.includes(author.name)) {
          const updatedAllAuthors = allAuthors.map((existingAuthor) =>
            existingAuthor.name === author.name ? author : existingAuthor
          );
          return { allAuthors: updatedAllAuthors };
        }
        return {
          allAuthors: allAuthors.concat(author),
        };
      });

      const newBookGenres = newBook.genres;
      newBookGenres.forEach((genre) => {
        console.log("MAPPED GENRE", genre);
        client.cache.updateQuery(
          {
            query: FILTER_BOOKS_BY_GENRE,
            variables: { genre: genre },
          },
          (data) => {
            console.log("DATA FROM FETCH", data);
            if (data) {
              console.log("DATA FROM FETCH RENDERED", data);
              const allBooks = data.allBooks;
              return {
                allBooks: allBooks.concat(newBook),
              };
            }

            const allBooks = [];
            return {
              allBooks: allBooks.concat(newBook),
            };
          }
        );
      });
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

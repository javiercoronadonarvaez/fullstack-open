import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ALL_BOOKS,
  ALL_AUTHORS,
  ADD_BOOK,
  FILTER_BOOKS_BY_GENRE,
} from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [appendBook] = useMutation(ADD_BOOK, {
    update: (cache, response) => {
      const newBook = response.data.addBook;
      console.log("Updated Response All Books", response.data);
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        console.log("All BOOKS", allBooks);
        return {
          allBooks: allBooks.concat(newBook),
        };
      });
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        console.log("All AUTHORS", allAuthors);
        const author = response.data.addBook.author;
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
        cache.updateQuery(
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

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    appendBook({ variables: { title, author, published, genres } });
    console.log("add book...");
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(null);

  useEffect(() => {
    if (result.data && !selectedGenre) {
      setFilteredBooks(result.data.allBooks);
    } else if (result.data) {
      const selectedBooks = result.data.allBooks.filter((book) =>
        book.genres.includes(selectedGenre)
      );
      setFilteredBooks(selectedBooks);
    }
  }, [selectedGenre, result.data]);

  if (result.loading) {
    console.log("HERE");
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;
  console.log("BOOKS", books);
  const bookGenres = books.map((book) => book.genres);
  console.log("BOOK GENRES", bookGenres);
  const genres = Array.from(new Set(bookGenres.flat(Infinity)));
  console.log("GENRES", genres);

  const renderGenreButtons = () => {
    return (
      <>
        {genres.map((genre) => (
          <button onClick={() => setSelectedGenre(genre)} key={genre}>
            {genre}
          </button>
        ))}
      </>
    );
  };

  console.log("Genre", selectedGenre);

  return (
    <div>
      <h2>books</h2>
      {renderGenreButtons()}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;

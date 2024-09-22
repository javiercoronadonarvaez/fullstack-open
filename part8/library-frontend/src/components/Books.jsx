import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, FILTER_BOOKS_BY_GENRE } from "../queries";
import { useEffect } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [allGenres, setAllGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { loading, error, data } = useQuery(FILTER_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  });

  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks;
      const bookGenres = books.map((book) => book.genres);
      const genres = Array.from(new Set(bookGenres.flat(Infinity)));
      console.log("GENRES", genres);
      setAllGenres(genres);
      setFilteredBooks(books);
    }
    if (data && selectedGenre) {
      const books = data.allBooks;
      setFilteredBooks(books);
    }
  }, [selectedGenre, result.data, data]);

  if (result.loading || loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const renderGenreButtons = () => {
    return (
      <>
        {allGenres.map((genre) => (
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

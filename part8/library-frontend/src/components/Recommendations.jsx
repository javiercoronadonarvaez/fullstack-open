import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_USER, FILTER_BOOKS_BY_GENRE } from "../queries";
import { useEffect } from "react";

const Recommendations = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const resultUser = useQuery(FETCH_USER);
  const { loading, error, data } = useQuery(FILTER_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  });

  useEffect(() => {
    if (resultUser.data && resultUser.data.me) {
      const favoriteGenre = resultUser.data.me.favoriteGenre;
      setSelectedGenre(favoriteGenre);
    }
  }, [resultUser.data]);

  if (resultUser.loading || loading) {
    console.log("HERE");
    return <div>Loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  console.log("FAVORITE GENRE", selectedGenre);
  const books = data ? data.allBooks : [];
  console.log("FAVORITE BOOKS", books);
  return (
    <div>
      <h2>books</h2>
      <p>
        Books in your favorite genre <b>{selectedGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default Recommendations;

import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        bookCount
      }
      published
      genres
    }
  }
`;

export const FILTER_BOOKS_BY_GENRE = gql`
  query FilterBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        bookCount
      }
      published
      genres
    }
  }
`;

export const FETCH_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ADD_BOOK = gql`
  mutation appendBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      bookCount
    }
    published
    genres
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const EDIT_BORN_YEAR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

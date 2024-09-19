const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}

type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
}

type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        id: ID
        genres: [String!]!
    ): Book
    addBookSchema(
        title: String!
        published: Int!
        author: String!
        id: String
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
}

type Query {
    dummy: Int 
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
}
`;

const authorNameRetriever = async (book) => {
  const author = await Author.findById(book.author);
  console.log("Found Author", author.name);
  return author.name;
};

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const allBooks = await Book.find({});
      console.log("All books", allBooks);
      if (args.author && args.genre) {
        const retrievedAuthor = await Author.findOne({ name: args.author });
        console.log("Retrieved Author", retrievedAuthor);
        const filteredBooks = await Book.find({
          author: retrievedAuthor,
          genres: `${args.genre}`,
        });
        console.log("Filtered Books", filteredBooks);
        return filteredBooks;
      } else if (args.author) {
        const retrievedAuthor = await Author.findOne({ name: args.author });
        console.log("Retrieved Author", retrievedAuthor);
        const filteredBooks = await Book.find({ author: retrievedAuthor });
        console.log("BOOKS", filteredBooks);
        return filteredBooks;
      } else if (args.genre) {
        const filteredGenreBooks = allBooks.filter((book) =>
          book.genres.includes(args.genre)
        );
        console.log("Filtered Books", filteredGenreBooks);
        return filteredGenreBooks;
      }

      return allBooks;
    },
    allAuthors: async () => Author.find({}),
  },

  Author: {
    bookCount: async (root) => {
      const allBooks = await Book.find();
      const filteredBooks = allBooks.filter(
        (book) => book.author === root.name
      );
      return filteredBooks.length;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const authorName = args.author;
      const authors = await Author.find({});
      console.log("Retrieved Authors", authors);
      const filteredAuthors = authors.filter((author) =>
        author.name.includes(authorName)
      );
      console.log("Filtered Authors", filteredAuthors);
      let book = new Book({ ...args });
      if (filteredAuthors.length === 0) {
        console.log("AUTHOR DOES NOT EXIST", authorName);
        const author = new Author({ name: authorName });
        await author.save();
        book.author = author;
      } else {
        const author = await Author.findOne({ name: authorName });
        console.log("Existing Author", author.name);
        book.author = author;
        console.log("Resulting Book", book);
      }
      await book.save();
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

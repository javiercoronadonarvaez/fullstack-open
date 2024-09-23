const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

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
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
}

type Query {
    dummy: Int 
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
}
`;

const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const allBooks = await Book.find({});
      if (args.author && args.genre) {
        const retrievedAuthor = await Author.findOne({ name: args.author });
        const filteredBooks = await Book.find({
          author: retrievedAuthor,
          genres: `${args.genre}`,
        });
        return filteredBooks;
      } else if (args.author) {
        const retrievedAuthor = await Author.findOne({ name: args.author });
        const filteredBooks = await Book.find({ author: retrievedAuthor });
        return filteredBooks;
      } else if (args.genre) {
        console.log("GENRE ACTIVATED");
        const filteredGenreBooks = await Book.find({
          genres: `${args.genre}`,
        });
        console.log("Filtered Books By Genre", filteredGenreBooks);
        return filteredGenreBooks;
      }
      console.log("ALL BOOKS", allBooks);
      return allBooks;
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return {
        name: author.name,
        id: author._id,
        born: author.born,
        bookCount: author.bookCount,
      };
    },
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.find({ name: root.name });
      const filteredBooks = await Book.find({ author: author });
      return filteredBooks.length;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

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
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving user failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
        book.author = author;
      } else {
        const author = await Author.findOne({ name: authorName });
        console.log("Existing Author", author.name);
        book.author = author;
        console.log("Resulting Book", book);
      }
      await book.save().catch((error) => {
        throw new GraphQLError("Creating the book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      });
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.find({ name: args.name });
      if (!author) {
        return null;
      }
      const updatedAuthor = await Author.findByIdAndUpdate(
        author,
        {
          ...author,
          born: args.setBornTo,
        },
        { new: true, runValidators: true, context: "query" }
      );
      console.log("Updated author", updatedAuthor);

      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      console.log("User for Token", userForToken);

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

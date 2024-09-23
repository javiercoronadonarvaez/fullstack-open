const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { GraphQLError } = require("graphql");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
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
    allAuthors: async () => Author.find({}).populate("books"),
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
      console.log("ROOT", root);
      if (root.books) {
        return root.books.length;
      }
      const author = await Author.find({ name: root.name }).populate("books");
      console.log("Populated Author Books", author[0].books);
      return author[0].books.length;
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
      let book = new Book({ ...args });
      let author = await Author.findOne({ name: authorName });
      if (!author) {
        console.log("AUTHOR DOES NOT EXIST", authorName);
        console.log("New Book Title", book.title);
        author = new Author({ name: authorName, books: book.title });
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
      } else {
        author.books = author.books.concat(book.title);
        await author.save();
        console.log("Existing Author", author.name);
      }

      book.author = author;

      await book.save().catch((error) => {
        throw new GraphQLError("Creating the book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      });

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;

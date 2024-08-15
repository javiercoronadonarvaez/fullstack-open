const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

//const url = `mongodb+srv://javiercoronarv:${password}@fullstack-open-jcn.8fv7i.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fullstack-open-jcn`;
require("dotenv").config();
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(TEST_MONGODB_URI);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is very easy",
  important: true,
});

const note2 = new Note({
  content: "testing",
  important: false,
});

const note3 = new Note({
  content: "Trying hard",
  important: true,
});

const note4 = new Note({
  content: "In the end it doesn't even matter",
  important: false,
});

const notesList = [note, note2, note3, note4];

const saveNotesList = async (notesList) => {
  for (const note of notesList) {
    await note
      .save()
      .then((result) => {
        console.log("Result:", result);
      })
      .catch((error) => {
        console.error("Error saving note:", error.message);
      });
  }
  mongoose.connection.close();
};

saveNotesList(notesList);

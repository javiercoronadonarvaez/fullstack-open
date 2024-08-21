import { useState, useEffect } from "react";
import noteService from "./services/notes";
import loginService from "./services/login";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [modifiedNoteContent, setModifiedNoteContent] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          //onChange={({ target }) => setUsername(target.value)}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          //onChange={({ target }) => setPassword(target.value)}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
      setModifiedNoteContent(
        Array.from({ length: initialNotes.length }, () => "")
      );
    });
  };

  useEffect(hook, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const changeShowAllStatus = () => {
    setShowAll(!showAll);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(`Error: ${error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const updateNoteContent = (event, id) => {
    event.preventDefault();
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, content: modifiedNoteContent[id - 1] };
    console.log("Changed NOTE", changedNote);
    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((n) => (n.id !== id ? n : returnedNote))),
        setModifiedNoteContent(
          notes.map((note) => (modifiedNoteContent[note.id - 1] = ""))
        );
    });
  };

  const handleUpdatedContent = (event, id) => {
    console.log(event.target.value);
    console.log(id);
    const newUpdatedContent = notes.map((note) =>
      note.id !== id ? "" : event.target.value
    );
    console.log(newUpdatedContent);
    setModifiedNoteContent(newUpdatedContent);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {/* <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            //onChange={({ target }) => setUsername(target.value)}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            //onChange={({ target }) => setPassword(target.value)}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form> */}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}
      <div>
        <button style={{ marginTop: "10px" }} onClick={changeShowAllStatus}>
          Show {showAll ? "Important" : "All"} notes
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            value={modifiedNoteContent[note.id - 1]}
            handleUpdatedContent={(event) =>
              handleUpdatedContent(event, note.id)
            }
            updateNoteContent={(event) => updateNoteContent(event, note.id)}
          />
        ))}
      </ul>
      <h1>Add New Note</h1>
      <form key="1" onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

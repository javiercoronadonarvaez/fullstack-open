import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import Menu from "./components/Menu";
import { Anecdote } from "./components/AnecdoteList";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((store) => store.anecdotes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  console.log("Anecdotes", anecdotes);
  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/create" element={<CreateNew />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

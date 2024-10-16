import { BrowserRouter as Router, Link } from "react-router-dom";

export const Anecdote = ({ anecdote }) => (
  <div>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see {<a href={anecdote.info}>{anecdote.info}</a>} votes</p>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          {<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>}
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;

import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateLikedAnecdote,
  updateDeletedAnecdote,
} from "../reducers/anecdoteReducer";

export const Anecdote = ({ anecdote }) => {
  if (!anecdote) {
    return null;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLikeClick = () => {
    const likedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    dispatch(updateLikedAnecdote(likedAnecdote));
  };

  const handleDeleteClick = () => {
    dispatch(updateDeletedAnecdote(anecdote));
    navigate("/");
  };

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <button onClick={handleLikeClick}>vote</button>
      <button onClick={handleDeleteClick}>delete</button>
      <p>
        for more info see {<a href={anecdote.info}>{anecdote.info}</a>} votes
      </p>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  if (anecdotes) {
    return (
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
  }
};

export default AnecdoteList;

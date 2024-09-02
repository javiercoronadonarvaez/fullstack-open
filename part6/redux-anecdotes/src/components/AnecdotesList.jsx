import { useSelector, useDispatch } from "react-redux";
import { incrementLikeCount } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(displayNotification(anecdote.content));
    dispatch(incrementLikeCount(anecdote.id));
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      const filteredAnecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
      return filteredAnecdotes;
    } else {
      return anecdotes;
    }
  });
  const descendingOrderAnecdotes = [...anecdotes].sort(
    (a, b) => b.votes - a.votes
  );
  return (
    <>
      <h2>Anecdotes</h2>
      {descendingOrderAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  );
};

export default Anecdotes;

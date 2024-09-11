import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { addNewAnecdote } from "../reducers/anecdoteReducer";
import { newAnecdoteNotification } from "../reducers/notificationReducer";

const CreateNew = () => {
  const dispatch = useDispatch();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: content.input.value,
      author: author.input.value,
      info: info.input.value,
      votes: 0,
    };
    dispatch(addNewAnecdote(newAnecdote));
    dispatch(newAnecdoteNotification(newAnecdote));
    navigate("/");
  };

  const handleReset = (event) => {
    event.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;

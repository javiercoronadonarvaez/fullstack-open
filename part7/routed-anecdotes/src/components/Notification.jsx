const Notification = ({ anecdote }) => {
  if (anecdote) {
    console.log("Anecdote", anecdote);
    return (
      <div>
        <p>A new anecdote: {anecdote.content} created!</p>
      </div>
    );
  }
};

export default Notification;

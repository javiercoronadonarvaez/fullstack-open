import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdoteWithVote } from "../requests";
import { useReducer } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import NotificationContext from "./components/NotificationContext";

const App = () => {
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "DISPLAY":
        return `Anecdote "${action.payload}" voted`;
      case "REMOVE":
        return "";
      default:
        return state;
    }
  };
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  console.log("Notification", notification);

  const queryClient = useQueryClient();
  const votedAnecdoteMutation = useMutation({
    mutationFn: updateAnecdoteWithVote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      queryClient.setQueryData(["anecdotes"], updatedAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    votedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: "DISPLAY", payload: anecdote.content });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  if (result.status === "error") {
    return (
      <span>Anecdote service note available due to problems in server</span>
    );
  }

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <Notification />
      </NotificationContext.Provider>
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

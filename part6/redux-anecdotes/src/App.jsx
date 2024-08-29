import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filters";

const App = () => {
  return (
    <div>
      <Filter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

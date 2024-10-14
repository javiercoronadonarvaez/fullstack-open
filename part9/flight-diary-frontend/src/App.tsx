import { useEffect } from "react";
import { initializeDiaries } from "./reducers/diariesReducer";
import { useAppDispatch } from "./hooks/hook";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";
import Error from "./components/Error";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDiaries());
  }, [dispatch]);

  return (
    <div>
      <Error />
      <NewDiary />
      <Diaries />
    </div>
  );
};

export default App;

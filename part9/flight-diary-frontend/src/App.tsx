import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diariesService";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchInitialDiaries = async () => {
      const fetchedInitialDiaries = await getAllDiaries();
      setDiaries(fetchedInitialDiaries);
    };
    fetchInitialDiaries();
  }, []);

  return (
    <div>
      <Diaries diaries={diaries} />
      <NewDiary />
    </div>
  );
};

export default App;

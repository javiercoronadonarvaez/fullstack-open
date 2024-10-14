import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diariesService";
import Diaries from "./components/Diaries";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState("");

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
    </div>
  );
};

export default App;

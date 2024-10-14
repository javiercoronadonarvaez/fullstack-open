import { useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import { DiaryEntry } from "../types";

const Diaries = () => {
  const diaries = useSelector((state: RootState) => state.diaries);

  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map((diary: DiaryEntry) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          <p>Comment: {diary.comment || "No comment"}</p>
        </div>
      ))}
    </div>
  );
};

export default Diaries;

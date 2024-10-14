import { DiaryEntries } from "../types";

const Diaries = ({ diaries }: DiaryEntries) => {
  return diaries.map((diary) => (
    <div key={diary.id}>
      <h2>{diary.date}</h2>
      <p>Visibility: {diary.visibility}</p>
      <p>Weather: {diary.weather}</p>
      <p>Comment: {diary.comment}</p>
    </div>
  ));
};

export default Diaries;

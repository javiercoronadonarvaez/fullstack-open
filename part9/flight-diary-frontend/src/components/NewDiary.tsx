import { NewDiaryEntry } from "../types";
import { useField, useAppDispatch } from "../hooks/hook";
import { addNewDiaryEntry } from "../reducers/diariesReducer";

const NewDiary = () => {
  const date = useField("date");
  const weather = useField("text");
  const visibility = useField("text");
  const comment = useField("text");

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date: date.value,
      weather: weather.value,
      visibility: visibility.value,
      comment: comment.value,
    } as unknown as NewDiaryEntry;
    dispatch(addNewDiaryEntry(newDiary));
  };

  return (
    <div>
      <h1>Add New Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Date: <input {...date} />
        </div>
        <div>
          Visibility: <input {...visibility} />
        </div>
        <div>
          Weather: <input {...weather} />
        </div>
        <div>
          Comment: <input {...comment} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NewDiary;

import { NewDiaryEntry } from "../types";
import { useField, useAppDispatch } from "../hooks/hook";
import { addNewDiaryEntry } from "../reducers/diariesReducer";
import { Visibility, Weather } from "../types";

const NewDiary = () => {
  const date = useField("date");
  const weather = useField("radio");
  const visibility = useField("radio");
  const comment = useField("text");

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date: date.input.value,
      weather: weather.input.value,
      visibility: visibility.input.value,
      comment: comment.input.value,
    } as unknown as NewDiaryEntry;
    dispatch(addNewDiaryEntry(newDiary));
    date.removeValue();
    comment.removeValue();
  };

  return (
    <div>
      <h1>Add New Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Date: <input {...date.input} />
        </div>
        Visibility
        <fieldset>
          {Object.values(Visibility).map((visibilityValue) => (
            <div key={visibilityValue}>
              <input
                id={visibilityValue}
                name="visibility"
                value={visibilityValue}
                type={visibility.input.type}
                onChange={visibility.input.onChange}
              />
              <label>{visibilityValue}</label>
            </div>
          ))}
        </fieldset>
        Weather
        <fieldset>
          {Object.values(Weather).map((weatherValue) => (
            <div key={weatherValue}>
              <input
                id={weatherValue}
                name="weather"
                value={weatherValue}
                type={weather.input.type}
                onChange={weather.input.onChange}
              />
              <label>{weatherValue}</label>
            </div>
          ))}
        </fieldset>
        <div>
          Comment: <input {...comment.input} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NewDiary;

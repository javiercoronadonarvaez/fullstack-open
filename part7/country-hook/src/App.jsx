import { useSelector, useDispatch } from "react-redux";
import Country from "./components/Country";
import Notification from "./components/Notification";
import { useField, useCountry } from "./hooks";
import { updateName } from "./reducers/nameReducer";

const App = () => {
  const dispatch = useDispatch();
  const nameInput = useField("text");
  const notification = useSelector((state) => state.notification);
  const country = useCountry();

  const fetch = (event) => {
    event.preventDefault();
    dispatch(updateName(nameInput.value));
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>
      <Notification notification={notification} />
      <Country country={country} />
    </div>
  );
};

export default App;

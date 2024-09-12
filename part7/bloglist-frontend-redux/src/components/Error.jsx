import { useSelector, useDispatch } from "react-redux";
import { removeError } from "../reducers/errorReducer";

const Error = () => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.error);
  let display = {};
  if (!error) {
    display = { display: "none" };
  } else {
    display = { display: "" };
    setTimeout(() => {
      dispatch(removeError());
    }, 5000);
  }

  return (
    <div style={display} className="error">
      {error}
    </div>
  );
};

export default Error;

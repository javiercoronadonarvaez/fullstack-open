import { useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import { useAppDispatch } from "../hooks/hook";
import { removeError } from "../reducers/errorReducer";

const Error = () => {
  const dispatch = useAppDispatch();
  const error = useSelector((state: RootState) => state.error);

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
      Error: {error}
    </div>
  );
};

export default Error;

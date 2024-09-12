import { useErrorValue } from "./ErrorContext";
import { useErrorDispatch } from "./ErrorContext";

const Error = () => {
  const error = useErrorValue();
  const errorDispatch = useErrorDispatch();
  let style = {};
  if (error) {
    style = { display: "" };
    setTimeout(() => {
      errorDispatch({ type: "REMOVE" });
    }, 5000);
  } else {
    style = { display: "none" };
  }

  return (
    <div style={style} className="error">
      {error}
    </div>
  );
};

export default Error;

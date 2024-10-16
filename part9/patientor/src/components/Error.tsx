interface Props {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const Error = ({ error, setError }: Props) => {
  let display = {};
  if (!error) {
    display = { display: "none" };
  } else {
    display = { display: "" };
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  return (
    <div style={display} className="error">
      Error: {error}
    </div>
  );
};

export default Error;

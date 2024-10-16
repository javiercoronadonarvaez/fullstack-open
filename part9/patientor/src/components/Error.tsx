import { DialogContent, Alert } from "@mui/material";

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
    <DialogContent style={display}>
      {error && <Alert severity="error">{error}</Alert>}
    </DialogContent>
  );
};

export default Error;

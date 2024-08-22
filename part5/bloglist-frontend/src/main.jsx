//import ReactDOM from "react-dom/client";
import App from "./App";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";

//ReactDOM.createRoot(document.getElementById("root")).render(<App />);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { useDispatch } from "react-redux";
import { useState } from "react";
import type { AppDispatch } from "../reducers/store"; // Import from wherever store is defined

// Custom hook for dispatch with thunk support
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useField = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("SELECTED RADIO", event.target.value);
    setValue(event.target.value);
  };

  const removeValue = () => {
    setValue("");
  };

  return {
    input: {
      type,
      value,
      onChange,
    },
    removeValue,
  };
};

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountry } from "../reducers/countryReducer";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const name = useSelector((state) => state.name);
  console.log("Name Changed", name);

  useEffect(() => {
    if (name) {
      dispatch(fetchCountry(name));
    }
  }, [name]);

  console.log("New Country", country);

  return country;
};

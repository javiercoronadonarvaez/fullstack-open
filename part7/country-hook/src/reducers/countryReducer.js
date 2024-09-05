import { createSlice } from "@reduxjs/toolkit";
import country from "../services/country";
import { updateNotification, removeNotification } from "./notificationReducer";

const countrySlice = createSlice({
  name: "country",
  initialState: null,
  reducers: {
    updateCountry(state, action) {
      return action.payload;
    },
    removeCountry(state, action) {
      return "";
    },
  },
});

export const { updateCountry, removeCountry } = countrySlice.actions;

export const fetchCountry = (countryName) => {
  return async (dispatch) => {
    // const fetchedCountry = await country.getCountry(countryName);
    await country
      .getCountry(countryName)
      .then((fetchedCountry) => {
        dispatch(updateCountry(fetchedCountry));
        dispatch(removeNotification());
      })
      .catch((error) => {
        dispatch(removeCountry());
        dispatch(updateNotification(error.response.data));
      });
    // console.log("Fetched Country", fetchedCountry);
    // dispatch(updateCountry(fetchedCountry));
  };
};

export default countrySlice.reducer;

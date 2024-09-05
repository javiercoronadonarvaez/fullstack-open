import { createSlice } from "@reduxjs/toolkit";

const nameSlice = createSlice({
  name: "name",
  initialState: "",
  reducers: {
    setName(state, action) {
      return action.payload;
    },
  },
});

export const { setName } = nameSlice.actions;

export const updateName = (name) => {
  return async (dispatch) => {
    dispatch(setName(name));
  };
};

export default nameSlice.reducer;

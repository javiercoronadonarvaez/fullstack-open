import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiaryEntry, NewDiaryEntry } from "../types";
import { getAllDiaries, addNewDiary } from "../services/diariesService";
import { AppDispatch } from "./store";
import axios from "axios";
import { setError } from "./errorReducer";

const initialState: DiaryEntry[] = [];

const diariesSlice = createSlice({
  name: "diaries",
  initialState,
  reducers: {
    setDiaries: (_state, action: PayloadAction<DiaryEntry[]>) => {
      return action.payload;
    },
    updateDiariesWithNewEntry: (state, action: PayloadAction<DiaryEntry>) => {
      const newDiary = action.payload;
      const updatedDiaries = state.concat(newDiary);
      return updatedDiaries;
    },
  },
});

export const { setDiaries, updateDiariesWithNewEntry } = diariesSlice.actions;

export const initializeDiaries = () => {
  return async (dispatch: AppDispatch) => {
    const diaries = await getAllDiaries();
    dispatch(setDiaries(diaries));
  };
};

export const addNewDiaryEntry = (newDiary: NewDiaryEntry) => {
  return async (dispatch: AppDispatch) => {
    try {
      const newlyCreatedDiary = await addNewDiary(newDiary);
      dispatch(updateDiariesWithNewEntry(newlyCreatedDiary));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("AXIOS ERROR");
        console.error(error.response);
        const errorMessages = error.response?.data.error.map(
          (error: { message: never }) => error.message
        );
        const errorString = errorMessages.join("\n");
        console.log(errorString);
        dispatch(setError(errorString));
      } else {
        return "ERROR";
      }
    }
  };
};

export default diariesSlice.reducer;

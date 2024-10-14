import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiaryEntry, NewDiaryEntry } from "../types";
import { getAllDiaries, addNewDiary } from "../services/diariesService";
import { AppDispatch } from "./store";
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
    const newlyCreatedDiary = await addNewDiary(newDiary);
    if (typeof newlyCreatedDiary === "string") {
      dispatch(setError(newlyCreatedDiary)); // Assuming setError expects a string
      console.error("Failed to create diary entry:", newlyCreatedDiary);
    } else {
      dispatch(updateDiariesWithNewEntry(newlyCreatedDiary));
    }
  };
};

export default diariesSlice.reducer;

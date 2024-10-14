import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const addNewDiary = async (
  newDiary: NewDiaryEntry
): Promise<DiaryEntry | string> => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("AXIOS ERROR");
      console.error(error.response);
      const errorMessages = error.response?.data.error.map(
        (error: { message: never }) => error.message
      );
      const errorString = errorMessages.join("\n");
      console.log(errorString);
      return errorString;
      // Do something with this error...
    } else {
      return "ERROR";
    }
  }
};

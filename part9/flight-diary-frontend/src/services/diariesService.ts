import axios from "axios";
import { DiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

// export const createNote = (object: NewNote) => {
//   return axios
//     .post<Note>(baseUrl, object)
//     .then(response => response.data)
// }

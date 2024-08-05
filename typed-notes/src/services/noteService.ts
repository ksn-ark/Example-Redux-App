import axios from "axios";
import { NewNote, Note } from "../utils/types";

const baseUrl = "http://localhost:3001/notes";

export const getAllNotes = () =>
  axios.get<Note[]>(baseUrl).then((response) => response.data);

export const createNote = (object: NewNote) =>
  axios.post<Note>(baseUrl, object).then((response) => response.data);

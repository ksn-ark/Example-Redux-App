import diaryEntries from "../../data/diaries";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => diaryEntries;

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] =>
  diaryEntries.map((diary) => {
    delete diary.comment;
    return diary;
  });

const findById = (id: number): DiaryEntry | undefined =>
  diaryEntries.find((diary) => diary.id === id);

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const id: number = Math.max(...diaryEntries.map((d) => d.id)) + 1;

  const newDiaryEntry = { id, ...entry };
  diaryEntries.push(newDiaryEntry);

  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  findById,
  getNonSensitiveEntries,
};

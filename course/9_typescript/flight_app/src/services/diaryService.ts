import diaries from '../../data/entries.ts';
import type { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types.ts';

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    // need to explicitly remove omitted fields since typeScript doesn't prohibit use of excess fields
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    // create a new diary entry by destructuring the new entry fields and adding a new id for it
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };
    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addDiary
};

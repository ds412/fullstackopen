// NO LONGER USED
// import type { NewDiaryEntry } from './types.ts';
// import { NewEntrySchema } from './types.ts';

// export const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//     return NewEntrySchema.parse(object);
// };

// export default parseNewDiaryEntry;


// // parse request body (given 'unknown' type) into NewDiaryEntry
// const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//     if (!object || typeof object !== 'object') {
//         throw new Error('Incorrect or missing data');
//     }
//     // esnure object has all the required fields (type narrowing)
//     if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
//         // parse all the fields from the object
//         const newEntry: NewDiaryEntry = {
//             weather: parseWeather(object.weather),
//             visibility: parseVisibility(object.visibility),
//             date: parseDate(object.date),
//             comment: parseComment(object.comment)
//         };
//         return newEntry;
//     }

//     throw new Error('Incorrect data: some fields are missing');
// };


// // FIELD PARSE FUNCTIONS
// // parse comment field (string)
// const parseComment = (comment: unknown): string => {
//     if (!comment || !isString(comment)) {
//         throw new Error('Incorrect or missing comment');
//     }
//     // here compiler knows comment is of type string, since it passed type guard isString()
//     return comment;
// };

// // parse date field (string, in date format)
// const parseDate = (date: unknown): string => {
//     if (!date || !isString(date) || !isDate(date)) {
//         throw new Error('Incorrect or missing date: ' + date);
//     }
//     return date;
// };

// // parse weather field
// const parseWeather = (weather: unknown): Weather => {
//     if (!weather || !isString(weather) || !isWeather(weather)) {
//         throw new Error('Incorrect or missing weather: ' + weather);
//     }
//     return weather;
// };

// // parse visibility field
// const parseVisibility = (visibility: unknown): Visibility => {
//     if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
//         throw new Error('Incorrect or missing visibility: ' + visibility);
//     }
//     return visibility;
// };


// // TYPE GUARDS
// // type guard for string type - allows type narrowing
// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// // type guard for date format
// const isDate = (date: string): boolean => {
//     // check if date string can be parsed as a date
//     return Boolean(Date.parse(date));
// };

// // type guard for Weather object
// const isWeather = (param: string): param is Weather => {
//     return (Object.values(Weather) as string[]).includes(param);
// };

// // type guard for Visibility object
// const isVisibility = (param: string): param is Visibility => {
//     return (Object.values(Visibility) as string[]).includes(param);
// };



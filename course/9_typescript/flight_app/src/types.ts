import { z } from 'zod';

// export weather as a const object
export const Weather = {
    Sunny: 'sunny',
    Rainy: 'rainy',
    Cloudy: 'cloudy',
    Stormy: 'stormy',
    Windy: 'windy',
} as const;
// derive type from the const Weather object
export type Weather = typeof Weather[keyof typeof Weather];

// export visibility as a const object
export const Visibility = {
    Great: 'great',
    Good: 'good',
    Ok: 'ok',
    Poor: 'poor',
} as const;
// derive visibility type from the const visibility object
export type Visibility = typeof Visibility[keyof typeof Visibility];

// export interface DiaryEntry {
//     id: number;
//     date: string;
//     weather: Weather;
//     visibility: Visibility;
//     comment?: string;           // optional
// }

// parse new diary entry as a Zod object schema
export const NewEntrySchema = z.object({
    weather: z.enum(Weather),
    visibility: z.enum(Visibility),
    date: z.iso.date(),
    comment: z.string().optional()
});


// a DiaryEntry type with the 'id' field omitted (infer the type from schema)
export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

// redefines DiaryEntry as extension of DiaryEntry with extra id field
export interface DiaryEntry extends NewDiaryEntry {
    id: number;
}
// a DiaryEntry type with the 'comment' field omitted
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

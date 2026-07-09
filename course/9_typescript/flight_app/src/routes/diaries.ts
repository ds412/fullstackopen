import express, { type Request, type Response, type NextFunction } from 'express';
import diaryService from '../services/diaryService.ts';
import { NewEntrySchema, type NonSensitiveDiaryEntry, type NewDiaryEntry, type DiaryEntry } from '../types.ts';
import { z } from 'zod';

// middleware function that parses newDiaryEntry from request body
const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        // calls schema parser on request body
        NewEntrySchema.parse(req.body);
        next();
    }
    // if error caught, passed to error handling middleware
    catch (error: unknown) {
        next(error);
    }
};

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    const data = diaryService.getNonSensitiveEntries();
    res.send(data);
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));

    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});


// since this has passed newDiaryParser middleware, we know that request body is proper new diary entry
// Note: Request is generic type, third parameter represents request body
router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
});

// router.post('/', (req, res) => {
//     // parse new diary entry from the request body and add to diary and return as response
//     try {
//         const newDiaryEntry = NewEntrySchema.parse(req.body);
//         const addedEntry = diaryService.addDiary(newDiaryEntry);
//         res.json(addedEntry);
//     } catch (error: unknown) {
//         if (error instanceof z.ZodError) {
//             res.status(400).send({ error: error.issues });
//         } else {
//             res.status(400).send({ error: 'unknown error' });
//         }
//     }
// });

// middleware to handle errors
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.use(errorMiddleware);




export default router;

import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteModel from './models/note'

const app = express();

app.get("/",  async (req, res, next) => {
    try {
        // throw Error('Ayvayı yedik!');
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
        // res.send({NoteModel})
    } catch (error) {
        next(error);
    }

});

//route hata yönetimi
app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

//genel hata yönetimi
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
})




export default app;
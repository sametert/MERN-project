import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from './routes/notes';

const app = express();

// JSON verilerini ayrıştırmak için middleware ekleniyor
app.use(express.json());

//express.Router nesnesini monte etmek için kullanılmıştır.
app.use("/api/notes" , notesRoutes);

//route hata yönetimi (endpoint)
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
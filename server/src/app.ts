import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from './routes/notes';
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import userRoutes from "./routes/users";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

//günlük tutmaya yarar
app.use(morgan("dev"));

// JSON verilerini ayrıştırmak için middleware ekleniyor. createNote func kullanabilmek için.
app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}))

app.use("/api/users", userRoutes);

//express.Router nesnesini monte etmek için kullanılmıştır.
app.use("/api/notes" , notesRoutes);

//route hata yönetimi (endpoint)
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

//genel hata yönetimi
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});


export default app;
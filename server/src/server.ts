import "dotenv/config";
import env from './util/validateEnv'
import mongoose from "mongoose";
import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send('Hello World!');
});

const port = env.PORT;

// require('dotenv').config();
mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose connected");

        //bunu neden göremiyorum?
        //bunu mongoose içerisine eklememizin nedeni? Eğer connect sağlanamazsa sunucuyu başlatılmasın.
        app.listen(port, () => {
            console.log("Server running on port: "  + port);
        });
    })
    .catch(console.error)



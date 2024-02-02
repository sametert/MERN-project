import express from "express";
import * as NotesController from "../controllers/notes";
// import { getNotes } from "../controllers/notes";

const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNote);

//aynı route olmasında sakınca yoktur. Çünkü http request'leri farklı. get and post
router.post("/", NotesController.createNotes);

export default router;
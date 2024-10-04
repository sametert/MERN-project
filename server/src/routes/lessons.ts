import express from "express";
import * as LessonsController from "../controllers/lessons";
// import { getNotes } from "../controllers/notes";

const router = express.Router();

router.get("/", LessonsController.getLessons);

router.get("/:lessonId", LessonsController.getLesson);

//aynı route olmasında sakınca yoktur. Çünkü http request'leri farklı. get and post
router.post("/", LessonsController.createLesson);

router.patch("/:lessonId" , LessonsController.updateLesson);

router.delete("/:lessonId" , LessonsController.deleteLesson);

export default router;
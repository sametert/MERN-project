import express from "express";
import * as EventsController from "../controllers/events";
// import { getNotes } from "../controllers/notes";

const router = express.Router();

router.get("/", EventsController.getEvents);

router.get("/:eventId", EventsController.getEvent);

//aynı route olmasında sakınca yoktur. Çünkü http request'leri farklı. get and post
router.post("/", EventsController.createEvents);

router.patch("/:eventId" , EventsController.updateEvent);

router.delete("/:eventId" , EventsController.deleteEvent);

export default router;
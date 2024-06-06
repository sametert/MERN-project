import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import LessonModel from "../models/lesson";

export const getLessons: RequestHandler = async (req, res, next) => {
    try {
        const lessons = await LessonModel.find().exec();
        res.status(200).json(lessons);
        // res.send({NoteModel})
    } catch (error) {
        next(error);
    }
};


export const getLesson: RequestHandler = async (req, res, next) => {
    const lessonId = req.params.lessonId;

    try {
        if (!mongoose.isValidObjectId(lessonId)) {
            throw createHttpError(400, "Yok mu ders falan filan aşko");
        }

        const lesson = await LessonModel.findById(lessonId).exec();

        if (!lesson) {
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(lesson);    
    } catch (error) {
        next(error);
    }
}

interface CreateLessonBody {
    day?: string,
    lessonName?: string,
    hour?: string
}

export const createLesson: RequestHandler<unknown, unknown, CreateLessonBody, unknown> = async (req, res, next) => {
    const day = req.body.day;
    const lessonName = req.body.lessonName;
    const hour = req.body.hour;

    try {
        if (!day) {
            throw createHttpError(400, "Note must have a day info");
        }

        const newLesson = await LessonModel.create({
            day : day,
            lessonName : lessonName,
            hour: hour
        });

        res.status(201).json(newLesson);
    } catch (error) {
        next(error);
    }
}

interface UpdateLessonParams {
    lessonId: string
};

interface UpdateLessonBody {
    day?: string,
    lessonName?: string,
    hour?: string
}

export const updateLesson: RequestHandler<UpdateLessonParams, unknown, UpdateLessonBody, unknown> = async (req, res, next) => {
    const lessonId = req.params.lessonId;
    const newDay = req.body.day;
    const newLessonName = req.body.lessonName;
    const newHour= req.body.hour;

    try {
        if (!mongoose.isValidObjectId(lessonId)) {
            throw createHttpError(400, "Invalid lesson id");
        }

        if (!newDay) {
            throw createHttpError(400, "Note must have a day");
        }

        const lesson = await LessonModel.findById(lessonId).exec();

        if (!lesson) {
            throw createHttpError(404, "Note not found");
        }

        lesson.day = newDay;
        lesson.lessonName = newLessonName ?? lesson.lessonName;
        lesson.hour = newHour ?? lesson.hour;

        const updatedLesson = await lesson.save();
        res.status(200).json(updatedLesson);

    } catch (error) {
        next(error);  
    }
}

export const deleteLesson: RequestHandler = async (req, res, next) => {
    const lessonId = req.params.lessonId;

    try {
        if (!mongoose.isValidObjectId(lessonId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const lesson = await LessonModel.findById(lessonId).exec();

        if (!lesson) {
            throw createHttpError(404, "Note not found");
        }

        // await note.remove();

        await LessonModel.findByIdAndDelete(lesson);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

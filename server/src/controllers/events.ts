import { RequestHandler } from "express";
import EventModel from "../models/event"
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getEvents: RequestHandler = async (req, res, next) => {
    try {
        const events = await EventModel.find().exec();
        res.status(200).json(events);
        // res.send({NoteModel})
    } catch (error) {
        next(error);
    }
};

export const getEvent: RequestHandler = async (req, res, next) => {
    const eventId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(eventId)) {
            throw createHttpError(400, "Invalid event id");
        }

        const event = await EventModel.findById(eventId).exec();

        if (!event) {
            throw createHttpError(404, "Event not found");
        }

        res.status(200).json(event);    
    } catch (error) {
        next(error);
    }
}

interface CreateEventBody {
    title?: string,
    text?: string,
}

export const createEvents: RequestHandler<unknown, unknown, CreateEventBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "Note must have a event title");
        }

        const newEvent = await EventModel.create({
            title : title,
            text : text,
        });

        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
}

interface UpdateEventParams {
    eventId: string
};

interface UpdateEventBody {
    title?: string,
    text?: string,
}

export const updateEvent: RequestHandler<UpdateEventParams, unknown, UpdateEventBody, unknown> = async (req, res, next) => {
    const eventId = req.params.eventId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(eventId)) {
            throw createHttpError(400, "Invalid event id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a event title");
        }

        const event = await EventModel.findById(eventId).exec();

        if (!event) {
            throw createHttpError(404, "Event not found");
        }

        event.title = newTitle;
        event.text  = newText;

        const updatedEvent = await event.save();
        res.status(200).json(updatedEvent);

    } catch (error) {
        next(error);  
    }
}

export const deleteEvent: RequestHandler = async (req, res, next) => {
    const eventId = req.params.eventId;

    try {
        if (!mongoose.isValidObjectId(eventId)) {
            throw createHttpError(400, "Invalid event id");
        }

        const event = await EventModel.findById(eventId).exec();

        if (!event) {
            throw createHttpError(404, "Event not found");
        }

        // await note.remove();

        await EventModel.findByIdAndDelete(event);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import FoodModel from "../models/food";

export const getFoods: RequestHandler = async (req, res, next) => {
    try {
        const foods = await FoodModel.find().exec();
        res.status(200).json(foods);
        // res.send({NoteModel})
    } catch (error) {
        next(error);
    }
};


export const getFood: RequestHandler = async (req, res, next) => {
    const foodId = req.params.foodId;

    try {
        if (!mongoose.isValidObjectId(foodId)) {
            throw createHttpError(400, "Yok mu food");
        }

        const food = await FoodModel.findById(foodId).exec();

        if (!food) {
            throw createHttpError(404, "Food not found");
        }

        res.status(200).json(food);    
    } catch (error) {
        next(error);
    }
}

interface CreateFoodBody {
    day?: string,
    foodName?: string
}

export const createFood: RequestHandler<unknown, unknown, CreateFoodBody, unknown> = async (req, res, next) => {
    const day = req.body.day;
    const foodName = req.body.foodName;

    try {
        if (!day) {
            throw createHttpError(400, "Food must have a day info");
        }

        const newFood = await FoodModel.create({
            day : day,
            foodName : foodName
        });

        res.status(201).json(newFood);
    } catch (error) {
        next(error);
    }
}

interface UpdateFoodParams {
    foodId: string
};

interface UpdateFoodBody {
    day?: string,
    foodName?: string
}

export const updateFood: RequestHandler<UpdateFoodParams, unknown, UpdateFoodBody, unknown> = async (req, res, next) => {
    const foodId = req.params.foodId;
    const newDay = req.body.day;
    const newFoodName = req.body.foodName;

    try {
        if (!mongoose.isValidObjectId(foodId)) {
            throw createHttpError(400, "Invalid food id");
        }

        if (!newDay) {
            throw createHttpError(400, "Food must have a day");
        }

        const food = await FoodModel.findById(foodId).exec();

        if (!food) {
            throw createHttpError(404, "Food not found");
        }

        food.day = newDay;
        food.foodName = newFoodName ?? food.foodName;

        const updatedFood = await food.save();
        res.status(200).json(updatedFood);

    } catch (error) {
        next(error);  
    }
}

export const deleteFood: RequestHandler = async (req, res, next) => {
    const foodId = req.params.foodId;

    try {
        if (!mongoose.isValidObjectId(foodId)) {
            throw createHttpError(400, "Invalid food id");
        }

        const food = await FoodModel.findById(foodId).exec();

        if (!food) {
            throw createHttpError(404, "Food not found");
        }

        // await note.remove();

        await FoodModel.findByIdAndDelete(food);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

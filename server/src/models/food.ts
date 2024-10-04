import { InferSchemaType, Schema, model } from "mongoose";

const foodSchema = new Schema({
    day: { type: String, required: true},
    foodName: { type: String, required: true},
}, { timestamps: true})

type Food = InferSchemaType<typeof foodSchema>

export default model<Food>("Food", foodSchema)
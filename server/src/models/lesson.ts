import { InferSchemaType, Schema, model } from "mongoose";

const lessonSchema = new Schema({
    day: { type: String, required: true},
    lessonName: { type: String, required: true},
    hour: { type: String, required: true}
}, { timestamps: true})

type Lesson = InferSchemaType<typeof lessonSchema>

export default model<Lesson>("Lesson", lessonSchema)
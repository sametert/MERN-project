import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    text:  { type: String },
},{ timestamps: true})

type Note = InferSchemaType<typeof noteSchema>;

//burada modelin adını ve schema ismini verdik. Verileri  daha girmedik.
export default model<Note>("Note", noteSchema);
import { InferSchemaType, Schema, model } from "mongoose";

const eventSchema = new Schema({
    title: { type: String, required: true },
    text:  { type: String },
},{ timestamps: true})

type Event = InferSchemaType<typeof eventSchema>;

//burada modelin adını ve schema ismini verdik. Verileri  daha girmedik.
export default model<Event>("Event", eventSchema);
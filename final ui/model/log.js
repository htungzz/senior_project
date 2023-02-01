import { Schema, model } from 'mongoose';




const logSchema = new Schema(
    {
        state: String,
        sensor: String
    }
);



export default logSchema;
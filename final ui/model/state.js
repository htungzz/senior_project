import { Schema, model } from 'mongoose';




const stateSchema = new Schema(
    {
        name: String,
        state: String
    }
);



export default stateSchema;
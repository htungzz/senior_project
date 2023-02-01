//import dbConnect from "../../util/dbconnect";
import logSchema from "../../model/log";
import mongoose from 'mongoose';
//import stateSchema from "../../model/state"

//const connectionString = process.env.MONGO_STRING
async function Add(req, res) {
    try {
        //console.log('connecting to mongodb');
        //await dbConnect();
        //const db = await mongoose.connect(connectionString);
        //console.log('connected to mongo');
        let Log;
        try {
            Log = mongoose.model("Log");
        } catch {
            Log = mongoose.model("Log", logSchema);
        }
        console.log(req.body)
        console.log('CREATING DOCUMENT');
        const log = await Log.create(req.body);
        console.log('CREATED DOCUMENT');

        res.json({ log });

        //db.disconnect();
        //console.log('mongo disconnected');
        
        
    }
    catch (error) {
        console.log(error);
    }

}
export default Add



import mongoose from 'mongoose';
import stateSchema from "../../model/state"
import dbConnect from '../../util/dbconnect';

//find all document in state collection return an array response
const connectionString = process.env.MONGO_STRING
async function findHandler(req, res ) {
    
    try {
        const query = req.query;
        const { name } = query;
        //console.log('connecting to mongodb');
        //await dbConnect();
        //mongoose.connect(connectionString);
        //console.log('connected to mongo');
        let State;
        try {
            State = mongoose.model("State");
        } catch {
            State = mongoose.model("State", stateSchema);
        }

        console.log('Reading DOCUMENT');
        const currentState = await State.find({"name": name});
        //console.log(currentState);
        console.log('Adopt DOCUMENT');
        
        
        res.json(currentState);
        
        
    }
    catch (error) {
        res.json(error)
        console.log(error);
    }

}
export default findHandler


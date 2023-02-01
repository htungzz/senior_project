import dbConnect from "../../util/dbconnect";
import stateSchema from "../../model/state";
import mongoose from 'mongoose';
import Server from 'socket.io'


async function Watch(req, res) {
    try {
        console.log('connecting to mongodb');
        //await dbConnect();
        console.log('connected to mongo');
        let State;
        try {
            State = mongoose.model("State");
        } catch {
            State = mongoose.model("State", stateSchema);
        }
        const changeStream = State.watch();
        changeStream.on('change', async (change) => {
            try {
                //console.log(change);
                const result = change
                console.log(result)
                res.status(200).json(result)
            } catch (error) {
                throw error
            }
        })
        
        
    }
    catch (error) {
        console.log(error);
    }

}
export default Watch


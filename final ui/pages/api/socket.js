import { Server } from 'socket.io'
import mongoose from 'mongoose'
import stateSchema from '../../model/log'



const SocketHandler = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        //console.log('connecting to mongodb');
        //await dbConnect();
        //console.log('connected to mongo');
        let State;
        try {
            State = mongoose.model("State");
        } catch {
            State = mongoose.model("State", stateSchema);
        }
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
        io.on('connection', socket => {
            console.log(socket.id)
        })
        const changeStream = State.watch();
        changeStream.on('change', async (change) => {
            try {
                //console.log(change);
                var check = checkObjectID(String(change.documentKey._id))
                var result = {
                    sensor : check,
                    state: change.updateDescription.updatedFields.state
                }
                //console.log(result.id)
                io.emit('changeData', result)
            } catch (error) {
                throw error
            }
        })
    }

    res.end()
}

export default SocketHandler

function checkObjectID(result) {
    switch (result) {
        case (process.env.CO2_OBJECTID):
            return "co2"
        case (process.env.TEMP_OBJECTID):
            return "temp"
        case (process.env.HUMID_OBJECTID):
            return "humid"
        case (process.env.DOOR_OBJECTID):
            return "door"
        case (process.env.KIT_OBJECTID):
            return "kitdoor"
        case (process.env.HALLWAY_OBJECTID):
            return "hallway"
        case (process.env.LIVING_OBJECTID):
            return "living"
        case (process.env.DINING_OBJECTID):
            return "dining"
        
    }
}
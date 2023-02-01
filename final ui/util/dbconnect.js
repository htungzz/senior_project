/* This is a database connection function*/
import mongoose from 'mongoose'
//import 'dotenv/config' 

const connection = {} ;/* creating connection object*/
const connectionString = process.env.MONGO_STRING;
async function DbConnect(req, res) {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    //res.json({msg: 'connected'})
    console.log('connected')
  }

  /* connecting to our database */
  const db = await mongoose.connect(connectionString)
  
  connection.isConnected = db.connections[0].readyState
  //res.json({msg: 'connect success'})
  console.log('connect success')
}

export default DbConnect
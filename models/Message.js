const mongoose = require("mongoose")


const msgSchema = new mongoose.Schema({
    name:String,
    message:String,
    timestamp:String,
    uid:String,
    roomId:String,
},{timestamps:true})

const Messages = mongoose.model("messages",msgSchema);

module.exports = Messages
const express = require("express")
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db")
const apiRouter = require("./router")
const cors = require("cors");
const mongoose  = require("mongoose");
const app = express();
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1585137",
    key: "788bf949774a072c8787",
    secret: "660494b0125d63a6f6d8",
    cluster: "ap2",
    useTLS: true
  });

const db = mongoose.connection 

db.on("open",()=>{
    const roomCollection = db.collection("rooms");
    const changeStream = roomCollection.watch();

    changeStream.on("change", (change) => {
        if(change.operationType === "insert"){
            const roomDetails = change.fullDocument;
            pusher.trigger("rooms","inserted",roomDetails)
        }
    });

    const messageCollection = db.collection("messages");
    const changeStream1 = messageCollection.watch();

    changeStream1.on("change", (change) => {
        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",messageDetails)
        }
        else{
            console.log("Not expected event to trigger");
        }
    });
    
})

const port = process.env.PORT || 4000;

connectDB();



app.use(cors())

app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}))

app.use("/api",apiRouter)

app.get("/",(req,res)=>{
    res.json("app is working")
})

app.listen(port,(req,res)=>{
    console.log(`server is up and runing on port ${port}`);
})
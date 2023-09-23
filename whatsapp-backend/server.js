//importing
import express  from "express";
import mongoose from "mongoose";
import Messages from "./dbMsg.js";
import Pusher from "pusher";
//app config
const app=express()
const port = process.env.PORT || 8080
const pusher = new Pusher({
    appId: "1650500",
    key: "3cda1e8db8a78c2a57bc",
    secret: "079f7d12456704cdbd10",
    cluster: "eu",
    useTLS: true
  });

// middleware
app.use(express.json());

//DB config
const connection_url = 'mongodb+srv://kalpik1:h21WcBDSwr5U1L6F@cluster0.mdjonne.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery',false);
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


    const db=mongoose.connection;
    db.once("open", () => {
        console.log("db connected");

        const msgCollection = db.collection("messagecontents");
        const changeStream = msgCollection.watch();

        changeStream.on("change", (change) => {
            console.log(change);
        });  
    });


//api routes
app.get("/",(req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync',(req,res) => {
    const data = req.body;
    Messages.find(data).then((result)=> {
        res.status(201).send(data)
    })
       .catch((err)=>{
        res.status(201).send(data)
       })
    });


app.post('/messages/new',(req,res) => {
    const data = req.body
    Messages.create(data).then((result) => {
            res.status(201).send(data)
        })
        .catch((err)=>{
            res.status(201).send(data)
    })
})

//listen
app.listen(port,()=>console.log(`Listening on localhost:${port}`))
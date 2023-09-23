//importing 
import express from "express";
import mongoose from 'mongoose';
import Messages from "./dbmsg.js";
import Pusher from "pusher";
import cors from 'cors';

//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1650500",
    key: "3cda1e8db8a78c2a57bc",
    secret: "079f7d12456704cdbd10",
    cluster: "eu",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors())

//db config
const connurl = 'mongodb+srv://kalpik-firse:kalpik03@cluster0.mdjonne.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db=mongoose.connection;
db.once("open", () => {
    console.log("db connected");

    const msgCollection = db.collection("messageconts ");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("a change occured",change);

        if(change.operationType === 'insert') {
            const msgdetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name: msgdetails.name,
                message:msgdetails.message,
                times:msgdetails.times,
                rec:msgdetails.rec,
            }
            );
        }
        else{
            console.log('error triggering pusher')
        }
        
    });  
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get('/messages/sync',(req, res) => {
    // try {
    //     const data = await Messages.find()
    //     res.json(data);
    // } catch (error) {
    //     console.error(error.message);
    //     res.status(500).send("internal server error");
    // }
    // const data = await req.body;
    Messages.find().then((data) => {
        res.status(200).send(data)
    })
        .catch((err) => {
            res.status(500).send(err)
        })
});

app.post('/messages/new', (req, res) => {
    const data = req.body
    Messages.create(data).then((data) => {
        res.status(201).send(`new message created:${data}`)
    })
        .catch((err) => {
            res.status(500).send(err)
        })
})


//listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
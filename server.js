import express from 'express'
import mongoose from 'mongoose'
import Cards from "./dbCards.js"
import Cors from "cors"

// App Config 
const app = express(); 
const port = process.env.PORT || 8001 //this allows port from Heroku and LocalHost
const url = "mongodb+srv://admin:11235813@cluster0.cqvep.mongodb.net/tinderdb?retryWrites=true&w=majority";



// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// API Endpoints

// API root to verify our backend is connected
//  call back function
app.get("/", (req, res)=>{
    res.status(200).send("HELLO CLEVER PROGRAMMERS!!!")
});

// Push a new card into our Cards collection
app.post("/tinder/cards", (req, res)=>{
    const dbCard = req.body;
    Cards.create(dbCard, (err, data)=>{
        if(err) {
            // failed to create error code
            res.status(500).send(err);
        }
        else {
            // successful creation code
            res.status(201).send(data);
        }
    })
});

// 
app.get("/tinder/cards", (req, res)=>{
    Cards.find((err, data)=>{
        if (err) {
            res.status(500).send(err);
        } 
        else {
            res.status(200).send(data);
        }
    })
});

// Listener
// string concatanation
app.listen(port, ()=>console.log(`listening on localhost: ${port}`))
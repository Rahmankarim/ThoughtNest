import app from './src/app'
import mongoose from "mongoose";

const port  = 800;

mongoose.connect('mongodb://localhost:27017/ThoughtNest', {
    serverSelectionTimeoutMS: 5000

}).then(()=>
{
console.log("MongoDB connected Successfully!")
});


app.listen(port, ()=>
{
    console.log(`Server is Running on Port: http://locolhost:${port}/`)
});

import app from './src/app';
import mongoose from 'mongoose';


// Define the port
const port = 800;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ThoughtNest', {
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log("MongoDB connected Successfully!");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is Running on Port: http://localhost:${port}/`);
});

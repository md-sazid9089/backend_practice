// Simple Express server with MongoDB connection
// The many comments in this file explain each step for learning purposes.

// Import the express library to build the HTTP server
const express = require('express');
// Import mongoose to talk to MongoDB
const mongoose = require('mongoose');

// Create the Express application object
const app = express();

// This middleware lets Express automatically parse JSON bodies in requests
app.use(express.json());

// Connection string for MongoDB. If the environment variable MONGO_URL is set
// we use that. Otherwise we default to a local MongoDB server.
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/beginner_db';

// Connect to MongoDB using mongoose. This returns a promise.
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true, // use the new URL parser from the MongoDB driver
  useUnifiedTopology: true, // opt in to using the MongoDB driver's new connection management engine
});

// Define a simple schema that describes how our data looks in MongoDB.
// Here each item has only a single field: name.
const itemSchema = new mongoose.Schema({
  name: String,
});

// Create a model from the schema. Models let us interact with the collection.
const Item = mongoose.model('Item', itemSchema);

// ===================== Routes ===================== //

// GET /items - return all items stored in the database
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find(); // fetch all documents
    res.json(items); // send them back to the client as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /items - create a new item
app.post('/items', async (req, res) => {
  // Create a new Item using the data sent in the request body
  const item = new Item({ name: req.body.name });

  try {
    const savedItem = await item.save(); // save the item to MongoDB
    res.status(201).json(savedItem); // send back the saved item
  } catch (err) {
    res.status(400).json({ message: err.message }); // invalid data
  }
});

// Start the server on port 3000 or whatever PORT is set to in the environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const FormData = require('./models/formdata');
const { v4: uuidv4 } = require('uuid');
// const formdata = require('./models/formdata');
// const formdata = require('./models/formdata');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://himanshus9325:Himanshu932595@cluster0.oxq2d.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
  const { input1, input2 } = req.body;


  try {
    // Generate a unique identifier for the combination of input values
   
    // Search for existing data with the same identifier
    // const identifier = req.body.identifier;

    const identifier = uuidv4();
    console.log(identifier)
    
    const existingData = await FormData.findOne({input1,input2});
    console.log(existingData)

    let numericValue;
    if (existingData) {
      // If data already exists for the same input values, use the stored numeric value
      numericValue = existingData.numericValue;
      // console.log(numericValue);
    } else {
      // If data does not exist, generate a new numeric value
      numericValue = Math.floor(Math.random() * 101);
      
      // Save the new data to the database
      const formData = new FormData({
        input1,
        input2,
        numericValue,
        identifier
      });
      await formData.save();
    }

    // Send the numeric value as the response
    res.json({ numericValue });
  } catch (err) {
    console.error('Error saving form data', err);
    res.status(500).send('Internal server error');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Bhava Server  ${PORT} var chaluy`);
});





// Flames 


const flamesResultSchema = new mongoose.Schema({
  yourName: { type: String, required: true },
  partnerName: { type: String, required: true },
  result: { type: String, required: true }
});

const FlamesResult = mongoose.model('FlamesResult', flamesResultSchema);

app.post('/save-flames', async (req, res) => {
  try {
      const { yourName, partnerName, result } = req.body;

      const fullResult = {
          "F": "Friendship",
          "L": "Love",
          "A": "Affection",
          "M": "Marriage",
          "E": "Enemy",
          "S": "Sister"
      }[result] || "Unknown";

      const newResult = new FlamesResult({ yourName, partnerName, result: fullResult });
      await newResult.save();
      res.json({ success: true });
  } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ success: false });
  }
});





// public/script.js

function submitForm() {
    const input1Value = document.getElementById('input1').value;
    const input2Value = document.getElementById('input2').value;

    // Send a POST request to the server with form data
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input1: input1Value,
            input2: input2Value
        })
    })
    .then(response => response.json())
    .then(data => {
        // Display numeric value from the response
        document.getElementById('numericLabel').innerText = `${input1Value} and  ${input2Value} love ${data.numericValue}% each other`;
    })
    .catch(error => console.error('Error submitting form data:', error));
}

// fetching the data from form 
// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017");
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


const User = mongoose.model('User', userSchema);

app.post('/search', (req, res) => {

  // ...

  User.find({
    input1: input1Value,
    input2: input1Value
  }, (err, value) => {
    if(err) return res.status(500).send(err);
    res.send(value); 
    
  });
});
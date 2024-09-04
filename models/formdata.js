
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  input1: { type: String, required: true },
  input2: { type: String, required: true },
  numericValue: { type: Number, required: true },
  identifier: { type: String, required: true },
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;


const mongoose = require('mongoose');

// Define the Car schema
const carSchema = new mongoose.Schema({
  category: { type: String, required: true },
  color: { type: String, required: true },
  model: { type: String, required: true },
  make: { type: String, required: true },
  registrationNo: { type: String, required: true },
});

// Create the Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;

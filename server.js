const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const username = encodeURIComponent('kamranmushtaq95');
const password = encodeURIComponent('Kamran@123');
const dbName = 'car-showroom';
const clusterUrl = 'cluster0.5yj9gkj.mongodb.net';
const mongoURI = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`; // mondodb URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Define your MongoDB models (e.g., Category and Car models)
// Replace 'Category' and 'Car' with your actual model names and schemas
const Category = require('./models/Category');
const Car = require('./models/Car');

// Route handler for fetching categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route handler for fetching cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Additional route handlers for creating, updating, and deleting categories and cars
// Replace the route handlers with your specific implementation

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


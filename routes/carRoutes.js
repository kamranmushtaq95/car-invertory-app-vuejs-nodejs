const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Create a new car
router.post('/cars', async (req, res) => {
  try {
    const { category, color, model, make, registrationNo } = req.body;
    const car = new Car({ category, color, model, make, registrationNo });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create car.' });
  }
});

// Get all cars
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars.' });
  }
});

// Update a car
router.put('/cars/:carId', async (req, res) => {
  try {
    const { category, color, model, make, registrationNo } = req.body;
    const { carId } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { category, color, model, make, registrationNo },
      { new: true }
    );
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update car.' });
  }
});

// Delete a car
router.delete('/cars/:carId', async (req, res) => {
  try {
    const { carId } = req.params;
    await Car.findByIdAndDelete(carId);
    res.json({ message: 'Car deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete car.' });
  }
});

module.exports = router;

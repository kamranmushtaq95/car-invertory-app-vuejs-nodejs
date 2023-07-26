const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create a new category
router.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category.' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories.' });
  }
});

// Update a category
router.put('/categories/:categoryId', async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category.' });
  }
});

// Delete a category
router.delete('/categories/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: 'Category deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category.' });
  }
});

module.exports = router;

const Category = require('../models/category.model');
const { check, validationResult } = require('express-validator');

// Add a new category
const addNewCategory = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        // Create a new category
        const { categoryname, description,imageLink } = req.body;
        const category = new Category({ categoryname, description,imageLink});
        const result = await category.save();

        if (result) {
            res.status(201).json({ success: true, message: "New Category Added Successfully" });
        } else {
            res.status(400).json({ success: false, message: "New Category Added Failed" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: 'No categories found' });
        }

        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
}

// Get a single category by ID
const getCategoryByID = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
}

// Update a category by ID
const updateCategoryByID = async (req, res) => {
    try {
        const { categoryname, description, imgLink } = req.body;
        const updateData = { categoryname, description, imgLink };
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category updated successfully', data: updatedCategory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to update category', error: err.message });
    }
}

// Delete a category by ID
const deleteCategoryByID = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete category', error: err.message });
    }
}

// Export the category controller methods
module.exports = { addNewCategory, getAllCategories, getCategoryByID, updateCategoryByID, deleteCategoryByID };

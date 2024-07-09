const express = require("express");
const router = express.Router();
const {  addNewCategory, getAllCategories, getCategoryByID, updateCategoryByID, deleteCategoryByID,getAllCategoriesCount } = require("../controller/category.contoller");

// Add a new customer
router.post('/add', addNewCategory);

// Get all customers
router.get("/", getAllCategories);


// Update a customer by ID
router.patch("/update/:id", updateCategoryByID);


// Get a customer by ID
router.get("/get/:id", getCategoryByID);


// Delete a customer by ID
router.delete("/delete/:id", deleteCategoryByID);

// Get all categories count
router.get("/count", getAllCategoriesCount);


// Exporting the router
module.exports = router;

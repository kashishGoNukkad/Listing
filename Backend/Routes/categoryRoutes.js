const express = require('express');
const router = express.Router();

const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = require('../Controllers/categoryController');


router.get('/all-categories', getAllCategories);
router.get('/category/:id', getCategoryById);
router.post('/create-category', createCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

module.exports = router;
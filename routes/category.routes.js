const express = require('express');
const router = express.Router();
const { createCategory,updateCategory,deleteCategory, getAllCategory} = require('../controllers/category.controllers');
const { authenticate} = require('../middlewares/auth');

// Create new Category
router.post('/add', authenticate,createCategory );
router.delete('/:id', authenticate, deleteCategory);
router.get('/All', getAllCategory);
router.put('/edit/:id', authenticate, updateCategory);
module.exports = router;
 
const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts } = require('../Controllers/productController');

router.post('/create-products', createProduct);
router.get('/products', getAllProducts);

module.exports = router;
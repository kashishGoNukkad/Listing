const Product = require('../Models/productModel');

const createProduct = async (req, res) => {
    // console.log("Request body:", req.body); 
  try {
    const { category, platform, categoryId, fields } = req.body;
    if (!category || !platform || !categoryId || !fields) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.'
      });
    }
    const product = await Product.create({ category, platform, categoryId, fields });
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ created_at: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts
};
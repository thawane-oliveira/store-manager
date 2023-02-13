const model = require('../models/products.model');

const getAllProducts = async () => {
  const result = await model.getAllProducts();
  return result;
};

const getProductById = async (id) => {
  const result = await model.getProductById(id);
  if (!result) {
    return { message: 'Product not found' };
  }
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
};

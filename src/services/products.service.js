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

const addNewProduct = async (product) => {
  const newProduct = await model.addNewProduct(product);
  return { id: newProduct, name: product.name };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};

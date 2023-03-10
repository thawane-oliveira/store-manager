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
  if (!product) {
    return { message: '"name" is required' };
  }
  return { id: newProduct, name: product.name };
};

const editProduct = async (name, id) => {
  const getProduct = await model.getProductById(id);
  if (!getProduct) return { message: 'Product not found' };
  await model.editProduct(name, id);
  return { id, name };
};

const deleteProduct = async (id) => {
  const getProduct = await model.getProductById(id);
  if (!getProduct) return { type: 404, message: 'Product not found' };
  await model.deleteProduct(id);
  return { type: 204 };
};

const searchProduct = async (searchValue) => {
  const getProducts = await model.getAllProducts();

  const verifyProducts = getProducts.filter(({ name }) => name.includes(searchValue));
  if (verifyProducts.length === 0) return getProducts;

  return verifyProducts;
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};

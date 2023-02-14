const service = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  const result = await service.getAllProducts();
  return res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const result = await service.getProductById(id);

  if (result.message) {
    return res.status(404).json(result);
  }
  return res.status(200).json(result);
};

const addNewProduct = async (req, res) => {
  const newProduct = await service.addNewProduct(req.body);
  return res.status(201).json(newProduct);
};

const editProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await service.editProduct(name, id);

  if (message) return res.status(type).json({ message });

  return res.status(type).json({ id, name });
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
};
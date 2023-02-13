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

module.exports = {
  getAllProducts,
  getProductById,
};
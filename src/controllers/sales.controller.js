const service = require('../services/sales.service');

const addNewSale = async (req, res) => {
  const sale = req.body;
  const result = await service.addNewSale(sale);
  return res.status(201).json(result);
};

const getAllSales = async (_req, res) => {
  const result = await service.getAllSales();
  console.log(result);
  return res.status(200).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const result = await service.getSaleById(id);

  if (!result || result.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(result);
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
};
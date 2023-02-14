const service = require('../services/sales.service');

const addNewSale = async (req, res) => {
  const sale = req.body;
  const result = await service.addNewSale(sale);
  return res.status(201).json(result);
};

module.exports = {
  addNewSale,
};
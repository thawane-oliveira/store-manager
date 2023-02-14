const model = require('../models/sales.model');

const addNewSale = async (saleProducts) => {
  const saleId = await model.addNewSale();

  await Promise.all(saleProducts.map((saleProduct) => model
    .addSaleDetails(saleId, saleProduct.productId, saleProduct.quantity)));

  return {
    id: saleId,
    itemsSold: saleProducts,
  };
};

const getAllSales = async () => {
  const result = await model.getAllSales();
  return result;
};

const getSaleById = async (id) => {
  const salesId = await model.getSaleById(id);
  return salesId;
};

const deleteSale = async (id) => {
  const getSale = await model.getSaleById(id);
  await model.deleteSale(id);
  return getSale;
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
};
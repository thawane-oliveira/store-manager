const model = require('../models/sales.model');

const addNewSale = async (saleProducts) => {
  const saleId = await model.addNewSale();

  await Promise.all(saleProducts.map(({ productId, quantity }) => model
    .addSaleDetails(saleId, productId, quantity)));

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
  // if (!getSale.length) {
  //   return { status: 404, responseJSON: { message: 'Sale not found' } };
  // }
  // return { status: 204, responseJSON: {} };
  return getSale;
};

const editSale = async (id, saleProducts) => {
  const salesId = await model.getSaleById(id);
  if (salesId.length === 0) {
    return { status: 404, responseJSON: { message: 'Sale not found' } };
  }
  await model.deleteSaleDetails(id);
  await Promise.all(saleProducts.map(({ productId, quantity }) => model
    .addSaleDetails(id, productId, quantity)));
  
  return { status: 200, responseJSON: { saleId: id, itemsUpdated: saleProducts } };
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
  editSale,
};
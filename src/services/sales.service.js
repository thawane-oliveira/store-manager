const model = require('../models/sales.model');

const addNewSale = async (saleProducts) => {
  const saleId = await model.addNewSale();

  console.log('ss', saleProducts);

  await Promise.all(saleProducts.map((saleProduct) => model
    .addSaleDetails(saleId, saleProduct.productId, saleProduct.quantity)));

  return {
    id: saleId,
    itemsSold: saleProducts,
  };
};

module.exports = {
  addNewSale,
};
const connection = require('./connection');

const addNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const addSaleDetails = async (saleId, prodId, qtt) => {
  const newDetail = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [saleId, prodId, qtt],
  );
  return newDetail;
};

module.exports = {
  addNewSale,
  addSaleDetails,
};

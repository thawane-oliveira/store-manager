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

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale.id AS saleId, prod.product_id AS productId, prod.quantity, sale.date
    FROM StoreManager.sales_products AS prod 
    INNER JOIN StoreManager.sales AS sale ON sale.id = prod.sale_id
    ORDER BY sale.id, productId`,
  );
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sale.date, prod.product_id AS productId, prod.quantity
    FROM StoreManager.sales_products AS prod
    INNER JOIN StoreManager.sales AS sale ON sale.id = prod.sale_id
    WHERE sale.id = ?
    ORDER BY sale.id, productId`,
    [id],
  );
  return result;
};

const deleteSaleDetails = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return result;
};

const deleteSale = async (id) => {
  await deleteSaleDetails(id);
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id =?',
    [id],
  );
  return result;
};

const editSale = async (id, sale) => {
  const { productId, quantity } = sale[0];
  console.log(id, 'id', sale, 'passou aqui model');
  const [result] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, id, productId],
  );
  console.log(result, 'result da model');
  return result;
};

module.exports = {
  addNewSale,
  addSaleDetails,
  getAllSales,
  getSaleById,
  deleteSale,
  editSale,
  deleteSaleDetails,
};

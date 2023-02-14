const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return result[0]; 
};

const addNewProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
  );
  return insertId;
};

const editProduct = async (name, id) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id =?',
    [id],
    );
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
  deleteProduct,
};

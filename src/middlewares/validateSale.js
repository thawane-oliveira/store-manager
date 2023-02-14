const productsModel = require('../models/products.model');

function validateSaleQuantity(req, res, next) {
  const sale = req.body;

  const quantityArray = sale.map((sl) => sl.quantity);

  const validateQuantity = quantityArray.some((qtt) => qtt === undefined);

  if (validateQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
}

function validateQuantityNumber(req, res, next) {
  const sale = req.body;
  const quantityArray = sale.map((sl) => sl.quantity);

  const validateQuantity = quantityArray.some((qtt) => qtt <= 0);

  if (validateQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
}

function validateProductId(req, res, next) {
  const product = req.body;

  const idArray = product.map((prod) => prod.productId);

  const validateId = idArray.some((id) => id === undefined);

  if (validateId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
}

async function validateIdExistence(req, res, next) {
  const product = req.body;

  const data = await productsModel.getAllProducts();

  const bodyArray = product.map((prod) => prod.productId);
  const bdArray = data.map((prod) => prod.id);

  const validateId = bodyArray.every((id) => bdArray.includes(id));

  if (!validateId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
}

module.exports = {
  validateSaleQuantity,
  validateQuantityNumber,
  validateProductId,
  validateIdExistence,
};
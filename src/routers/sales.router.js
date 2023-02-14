const salesRouter = require('express').Router();

const controller = require('../controllers/sales.controller');
const {
  validateQuantityNumber,
  validateSaleQuantity,
  validateProductId,
  validateIdExistence,
} = require('../middlewares/validateSale');

salesRouter.post('/',
  validateQuantityNumber,
  validateSaleQuantity,
  validateProductId,
  validateIdExistence,
  controller.addNewSale);

module.exports = salesRouter;
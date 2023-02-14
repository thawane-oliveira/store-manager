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

salesRouter.get('/', controller.getAllSales);

salesRouter.get('/:id', controller.getSaleById);

salesRouter.delete('/:id', controller.deleteSale);

module.exports = salesRouter;
const productsRouter = require('express').Router();

const controller = require('../controllers/products.controller');

productsRouter.get('/', controller.getAllProducts);
productsRouter.get('/:id', controller.getProductById);

module.exports = productsRouter;
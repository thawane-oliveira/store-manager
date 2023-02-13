const productsRouter = require('express').Router();

const controller = require('../controllers/products.controller');
const productNameValidation = require('../middlewares/productNameValidation');

productsRouter.get('/', controller.getAllProducts);
productsRouter.get('/:id', controller.getProductById);
productsRouter.post('/', productNameValidation, controller.addNewProduct);

module.exports = productsRouter;
const productsRouter = require('express').Router();

const controller = require('../controllers/products.controller');
const productNameValidation = require('../middlewares/productNameValidation');

productsRouter.get('/', controller.getAllProducts);

productsRouter.get('/:id', controller.getProductById);

productsRouter.post('/', productNameValidation, controller.addNewProduct);

productsRouter.put('/:id', productNameValidation, controller.editProduct);

productsRouter.delete('/:id', controller.deleteProduct);

module.exports = productsRouter;
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts, finalJustice, newProductName, expectedEdited, editedName } = require('../mocks/product.mock');
// const connection = require('../../../src/models/connection');
// const controllers = require('../../../src/controllers/products.controller');
const services = require('../../../src/services/products.service');
const models = require('../../../src/models/products.model');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da camada Service', function () {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se são retornados todos os produtos - com service', async function () {
    sinon.stub(models, 'getAllProducts').resolves(allProducts);
    const productArray = await services.getAllProducts();
    expect(productArray).to.be.deep.equal(allProducts);
  });

  it('Verifica se é retornado somente o produto correspondente ao id pesquisado - com service', async function () {
    sinon.stub(models, 'getProductById').resolves(finalJustice);
    const result = await services.getProductById(3);
    expect(result).to.be.deep.equal(finalJustice);
  });

  it('Verifica se é retornada uma mensagem de erro caso não seja encontrado produto com o id pesquisado - com service', async function () {
    sinon.stub(models, 'getProductById').returns();
    const result = await services.getProductById(49);
    expect(result).to.be.deep.equal({ message: 'Product not found' })
  });

  it('Verifica se é retornada uma mensagem de erro caso seja feita tentativa de cadastro de produto sem nome - com service', async function () {
    sinon.stub(models, 'addNewProduct').returns();
    const result = await services.addNewProduct('');
    expect(result).to.deep.equal({ message: '"name" is required' })
  });

  it('Verifica se é possível cadastrar um novo produto com sucesso - com service', async function () {
    sinon.stub(models, 'addNewProduct').returns();
    const result = await services.addNewProduct(newProductName);
    expect(result.name).to.deep.equal('Rykiel Vaquinha Maltesa');
  });

  it('Verifica se é possível editar um produto já existente com sucesso - com service', async function () {
    sinon.stub(models, 'editProduct').returns();
    const result = await services.editProduct('Hamon Bubbles', 1);
    expect(result).to.deep.equal(expectedEdited);
  });

  it('Verifica se não é possível editar um produto inexistente- com service', async function () {
    sinon.stub(models, 'editProduct').returns();
    const result = await services.editProduct('Heaven`s Door', 21);
    expect(result).to.deep.equal({ message: 'Product not found' });
  });

  it('Verifica se é possível excluir um produto já existente com sucesso - com service', async function () {
    sinon.stub(models, 'deleteProduct').returns();
    const result = await services.deleteProduct(1);
    expect(result).to.deep.equal({ type: 204 });
  });

  it('Verifica se é não é possível excluir um produto inexistente - com service', async function () {
    sinon.stub(models, 'deleteProduct').returns();
    const result = await services.deleteProduct(28);
    expect(result).to.deep.equal({ type: 404, message: 'Product not found' });
  });
});

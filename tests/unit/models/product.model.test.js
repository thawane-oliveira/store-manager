const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts, finalJustice, newProductName, editedOk } = require('../mocks/product.mock');
const connection = require('../../../src/models/connection');
const models = require('../../../src/models/products.model');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da camada Model', function () {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se são retornados todos os produtos - com model', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const searchAll = await models.getAllProducts();
    expect(searchAll).to.be.a('array');
    expect(searchAll).to.be.deep.equal(allProducts);
  });

  it('Verifica se é retornado somente o produto respectivo ao id - com model', async function () {
    sinon.stub(connection, 'execute').resolves([[finalJustice]]); // recebi ajuda do Carlos na mentoria de 13/02 para entender melhor o funcionamento do stub
    const capAmerica = await models.getProductById(3);
    expect(capAmerica).to.be.a('object'); //object like
    expect(capAmerica).to.be.deep.equal(finalJustice);
  });

  it('Verifica se é possível cadastrar um produto novo - com model', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 6 }]);
    const result = await models.addNewProduct(newProductName);
    expect(result).to.equal(6);
  });

  it('Verifica se é possível editar um produto do banco de dados - com model', async function () {
    sinon.stub(connection, 'execute').resolves([editedOk]);
    const result = await models.editProduct('Xablauzinho', 2);
    expect(result).to.equal(editedOk);
  });

  it('Verifica se é possível excluir um produto do banco de dados - com model', async function () {
    sinon.stub(connection, 'execute').resolves([editedOk]);
    const result = await models.deleteProduct(2);
    expect(result).to.equal(editedOk);
  });

});

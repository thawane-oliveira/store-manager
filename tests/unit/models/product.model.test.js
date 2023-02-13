const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts, finalJustice } = require('../mocks/product.mock');
// const connection = require('../../../src/models/connection');
// const controllers = require('../../../src/controllers/products.controller');
// const services = require('../../../src/services/products.service');
const models = require('../../../src/models/products.model');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da camada Model', function () {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se são retornados todos os produtos - com model', async function () {
    // sinon.stub(connection, 'execute').resolves(allProducts);
    const searchAll = await models.getAllProducts();
    expect(searchAll).to.be.a('array');
    expect(searchAll).to.be.deep.equal(allProducts);
  });

  it('Verifica se é retornado somente o produto respectivo ao id - com model', async function () {
    // sinon.stub(connection, 'execute').resolves(finalJustice);
    const capAmerica = await models.getProductById(3);
    expect(capAmerica).to.be.a('object');
    expect(capAmerica).to.be.deep.equal(finalJustice);
  });

});

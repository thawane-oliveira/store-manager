const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { dojyan, scaryMonsters, tusk } = require('../mocks/sale.mock');
const services = require('../../../src/services/sales.service');
const models = require('../../../src/models/sales.model');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da camada Service para a rota sales', function () {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se é possível adicionar os detalhes uma nova venda - com service', async function () {
    sinon.stub(models, 'addNewSale').resolves(3);
    sinon.stub(models, 'addSaleDetails').resolves();

    const result = await services.addNewSale(dojyan);

    expect(result).to.deep.equal(scaryMonsters);
  });

  it.skip('Verifica se não é possível cadastrar uma venda com id inexistente - com service', async function () {
    sinon.stub(models, 'addNewSale').resolves(3);
    sinon.stub(models, 'addSaleDetails').resolves();
    
    const result = await services.addNewSale(tusk);

    expect(result).to.be.deep.equal({ message: 'Product not found' })
  });
});

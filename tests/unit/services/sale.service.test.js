const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { dojyan, scaryMonsters, tusk, ballBreaker, creamStartler } = require('../mocks/sale.mock');
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

  it('Verifica se é possível listar todas as vendas - com service', async function () {
    sinon.stub(models, 'getAllSales').resolves(ballBreaker);
    const sales = await services.getAllSales();
    expect(sales).to.be.deep.equal(ballBreaker);
  });

  it('Verifica se é possível listar vendas pelo id - com service', async function () {
    sinon.stub(models, 'getSaleById').resolves(creamStartler);
    const sales = await services.getSaleById(1);
    expect(sales).to.be.deep.equal(creamStartler);
  });
});

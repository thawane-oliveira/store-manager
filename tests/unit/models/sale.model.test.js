const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { dojyan, scaryMonsters, ballBreaker, creamStartler } = require('../mocks/sale.mock');
const connection = require('../../../src/models/connection');
const models = require('../../../src/models/sales.model');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da camada Model para a rota sales', function () {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se é possível cadastrar uma nova venda - com model', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await models.addNewSale();
    expect(result).to.equal(3);
  });

  it('Verifica se é possível cadastrar detalhes de uma nova venda - com model', async function () {
    sinon.stub(connection, 'execute').resolves(dojyan);

    const result = await models.addSaleDetails([scaryMonsters]);

    expect(result).to.equal(dojyan);
  });

  it('Verifica se são retornados todos os produtos - com model', async function () {
    sinon.stub(connection, 'execute').resolves([ballBreaker]);
    const searchAll = await models.getAllSales();
    expect(searchAll).to.be.a('array');
    expect(searchAll).to.be.deep.equal(ballBreaker);
  });

  it('Verifica se é retornado somente o produto respectivo ao id - com model', async function () {
    sinon.stub(connection, 'execute').resolves([creamStartler]);
    const sales = await models.getSaleById(3);
    expect(sales).to.be.deep.equal(creamStartler);
  });

  it('Verifica se é possível deletar uma venda e seus detalhes pelo id - com model', async function () {
    sinon.stub(connection, 'execute').resolves([scaryMonsters]);
    const sales = await models.deleteSale(3);
    expect(sales).to.be.deep.equal(scaryMonsters);
  });
});

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { dojyan, scaryMonsters } = require('../mocks/sale.mock');
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
});

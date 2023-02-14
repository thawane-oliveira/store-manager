const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { dojyan, scaryMonsters, tusk } = require('../mocks/sale.mock');
const controllers = require('../../../src/controllers/sales.controller');
const services = require('../../../src/services/sales.service');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da camada Controller para a rota sales', function () {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se é possível cadastrar uma venda - com controllers', async function () {
    const req = { body: dojyan };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'addNewSale').resolves(dojyan);

    await controllers.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    // expect(res.json).to.have.been.calledWith(scaryMonsters);

  });

});
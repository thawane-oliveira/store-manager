const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { dojyan, ballBreaker, scaryMonsters, creamStartler, d4c, softAndWet, paisleyPark } = require('../mocks/sale.mock');
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
    expect(res.json).to.have.been.calledWith(dojyan);
  });

  it('Verifica se ao entrar na rota /sales com GET são retornadas todas as vendas - com controllers', async function () {

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'getAllSales').resolves(ballBreaker);

    await controllers.getAllSales(req, res);
    expect(res.json).to.have.been.calledWith(ballBreaker);
    expect(res.status).to.have.been.calledOnceWith(200);
  });

  it('Verifica se ao entrar na rota /sales:id com GET é retornada a venda específica do id - com controllers', async function () {

    const req = { params: { id: '1' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'getSaleById').resolves(creamStartler);

    await controllers.getSaleById(req, res);
    expect(res.json).to.have.been.calledWith(creamStartler);
    expect(res.status).to.have.been.calledOnceWith(200);
  });

  it('Verifica se ao entrar na rota /sales:id com id inexistente, é exibido erro - com controllers', async function () {

    const req = { params: { id: '49' } };
    const res = {};
    const msgMock = { message: 'Sale not found' }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'getSaleById').resolves([]);

    await controllers.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(msgMock);
  });

  it('Verifica se ao entrar na rota /sales:id com DELETE é possível deletar uma venda - com controllers', async function () {

    const req = { params: { id: '1' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'deleteSale').resolves(d4c);

    await controllers.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Verifica se ao entrar na rota /sales:id com DELETE não é possível deletar uma venda, que tenha id inválido - com controllers', async function () {

    const req = { params: { id: '49' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'deleteSale').resolves([]);

    await controllers.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('Verifica se ao entrar na rota /sales:id com PUT é possível editar uma venda já cadastrada - com controllers', async function () {

    const mockResolve = { status: 200, responseJSON: paisleyPark }

    const req = { params: { id: '1' }, body: softAndWet };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'editSale').resolves(mockResolve);

    await controllers.editSale(req, res);

    expect(res.json).to.have.been.calledWith(paisleyPark);
    expect(res.status).to.have.been.calledWith(200);
  });

});
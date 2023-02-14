const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts, finalJustice } = require('../mocks/product.mock');
const controllers = require('../../../src/controllers/products.controller');
const services = require('../../../src/services/products.service');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da camada Controller', function () {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se ao entrar na rota /products é retornado um array de objetos com todos os produtos e status 200 - com controllers', async function () {

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'getAllProducts').resolves(allProducts);

    await controllers.getAllProducts(req, res);
    expect(res.json).to.have.been.calledWith(allProducts);
    expect(res.status).to.have.been.calledOnceWith(200);
  });

  it('Verifica se ao entrar na rota /products/:id é retornado um único objeto respectivo ao id, com status 200 - com controllers', async function () {

    const req = { params: { id: '3' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'getProductById').resolves(finalJustice);

    await controllers.getProductById(req, res);
    expect(res.json).to.have.been.calledWith(finalJustice);
    expect(res.status).to.have.been.calledOnceWith(200);
  });

  it('Verifica se é retornada uma mensagem de erro com status 404 caso não seja encontrado nenhum produto pelo id pesquisado - com controllers', async function () {
    const req = { params: { id: '49' } };
    const res = {};
    const msgMock = { type: 404, message: 'Product not found' }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'getProductById').resolves(msgMock);
    
    await controllers.getProductById(req, res);

    expect(res.status).to.have.been.calledOnceWith(404);
    expect(res.json).to.have.been.calledOnceWith(msgMock);
  });

  it('Verifica se é retornada uma mensagem de erro com status 400 caso não seja passado nenhum name no cadastro - com controllers', async function () {
    const req = { params: { name: 'ryk' } };
    const res = {};
    const emptyName = { type: 400, message: '"name" length must be at least 5 characters long' }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(services, 'addNewProduct').resolves(emptyName);
    await controllers.addNewProduct(req, res);

    expect(res.json).to.have.been.calledOnceWith(emptyName);
  });

});
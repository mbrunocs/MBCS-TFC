import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { ILogin } from '../interfaces/IFaces';
import Users from '../database/models/user';

chai.use(chaiHttp);

const TOKEN24H = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NTk5OTYxODgsImV4cCI6MTY2MDA4MjU4OH0.4Arg4Qx1adsTXai9fswF_7PpWRvu94G6UBnD8-ohYKk'
};
const INVALID_TOKEN = { // "message": "Token must be a valid token"
  token: 'eyJhbGciOiJ6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyY4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NTkDgsImV4cCI6MTY2MDA4MjU4OH0.4Arg4Qx1adsTXai9fswF_7PpWR94G6UBnD8-ohYKk'
};

const { expect } = chai;

describe('Teste acesso de /login', () => {
  describe('valida sucesso em login', () => {

    let chaiHttpResponse: Response;
  
    const stubRequest: ILogin = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    }
  
    const stubResponse: {} = { TOKEN24H }
  
    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(stubResponse as Users);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })
  
    // it('...', async () => {
    //   chaiHttpResponse = await chai
    //      .request(app)
    //      ...
  
    //   expect(...)
    // });
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(stubRequest);
      // expect(chaiHttpResponse.body).to.have.property('token');
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});

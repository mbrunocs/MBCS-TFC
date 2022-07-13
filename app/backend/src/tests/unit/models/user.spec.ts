import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// referencia: https://www.npmjs.com/package/sequelize-test-helpers
import * as sequeltest from 'sequelize-test-helpers-ts'; // lib não instalada
import * as UserModel from '../../../database/models';

import { app } from '../../../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);


type IUser = {
  id: number;
  username: string;
  role: string;
  email: number;
  password: string;
}

const { expect } = chai;
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = sequeltest;

describe('sec/models/User', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  
  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })
  
  //const User = UserModel(sequelize, dataTypes);
  //const user = new User();
  //checkModelName(User)('User');

  context('properties', () => {
    ;[
      'id',
      'username',
      'role',
      'email',
      'password'
    ].forEach(checkPropertyExists())
  })


  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const URL = '/api/convert';

chai.use(chaiHttp);

suite('Functional tests', () => {
  suite('Routing tests', () => {
    suite('GET /api/convert => conversion object', () => {
      test('Convert 10L (valid input)', (done) => {
        chai
          .request(server)
          .get(URL)
          .query({ input: '10L' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'l');
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, 'gal');
            done();
          });
      });

      test('Convert 32g (invalid input unit)', (done) => {
        chai
          .request(server)
          .get(URL)
          .query({ input: '32g' })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'invalid unit');
            done();
          });
      });

      test('Convert 1a3lbs (invalid number)', (done) => {
        chai
          .request(server)
          .get(URL)
          .query({ input: '1a3lbs' })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'invalid number');
            done();
          });
      });

      test('Convert 1a3kilomegagram (invalid number and unit)', (done) => {
        chai
          .request(server)
          .get(URL)
          .query({ input: '1a3kilomegagram' })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'invalid number and unit');
            done();
          });
      });

      test('Convert kg (no number)', (done) => {
        chai
          .request(server)
          .get(URL)
          .query({ input: 'kg' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'kg');
            assert.approximately(res.body.returnNum, 2.20462, 0.1);
            assert.equal(res.body.returnUnit, 'lbs');
            done();
          });
      });
    });
  });
});
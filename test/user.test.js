const app = require('../app.js');
const request = require('supertest');
const sinon = require('sinon');

const jwt = require('jsonwebtoken');

const { queryInterface } = require('../models/index.js').sequelize;

describe('User Router', function() {
  beforeAll(function() {
    queryInterface.bulkDelete('Users');
  });

  describe('Register a user', function() {
    describe('Success:', function() {
      test('Should return status code 201 with result of JSON with keys (id, email)', function(done) {
        request(app)
          .post('/register')
          .send({
            email: 'arnold@gmail.com',
            password: '12345'
          })
          .set('Accept', 'application/json')
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data).toHaveProperty('email', 'arnold@gmail.com');
            expect(data).not.toHaveProperty('password');
          })
          .end(function(err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      
      });
    });

    describe('Failed:', function() {
      test('Should return status code 400 with result of JSON because password length should between 4 - 8', function(done) {
        request(app)
          .post('/register')
          .send({
            email: 'arnold@gmail.com',
            password: '123'
          }) //data
          .set('Accept', 'application/json') //headers
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(function (result) {
            let data = result.body;
            expect(data.message).toContain('Password length should between 4 and 8');
          })
          .end(function(err) {
            if (err) {
              return done(err)
            } else {
              done()
            }
          })
      });
    })
  });

  describe('Login a user from website', function() {
    describe('Success:', function() {
      // process stub hanya berada di describe Success ini sebelum test berjalan
      sinon.stub(jwt, 'sign').returns('Hash_JWT');
      sinon.stub(jwt, 'verify').returns({email: 'arnold@gmail.com'}) // returns di hardcode

      test('Should return status code 200 with result of JSON with keys (access_token)', function(done) {
        request(app)
        .post('/login')
        .send({
          email: 'arnold@gmail.com',
          password: '12345'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          let data = res.body;
          expect(data).toHaveProperty('access_token', 'Hash_JWT');
        })
        .end(function (err) {
          if (err) {
            return done(err)
          }
          done()
        })
      })
    })
    describe('Fail:', function() {
      
    })
  })

  afterAll(function() {
    queryInterface.bulkDelete('Users');
  });
});


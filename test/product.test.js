const { queryInterface } = require('../models/index.js').sequelize;

// kalau bingung pake stub bisa pake bcrypt
const { hashPassword } = require('../helpers/bcrypt.js')

describe('Product Router', function() {
  let people = [{
    id: 1,
    email: 'arnold@mail.com',
    password: '$2a$04$E2JY3YvdGtb4uTt1wYkEsO0W0KGQGpbkFxsSBB3uw9/EbFSNrUSl6',
    createdAt: '2020-05-11T15:19:17.682Z',
    updatedAt: '2020-05-11T15:19:17.682Z'
  }]; // isinya diisi dengan dummy yang merupakan gambaran data yang akan dipakai saat testing
  // dummy akan digantikan pada saat setup dibuat di line 29

  let fakePeople = [{
    id: 1,
    email: 'arnold@mail.com',
    password: hashPassword('12345'),
    createdAt: new Date,
    updatedAt: new Date
  }]; // fake adalah data bohongan yang dipake saat testing dan development, seperti faker js

  beforeAll(function(done) {
    queryInterface.bulkInsert('Users', fakePeople, {
      returning: true
    })
      .then(newUsers => {
        people = newUsers;
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  afterAll(function(done) {
    queryInterface.bulkDelete('Users')
      .then(_ => {
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  describe('Create a product', function() {
    describe('Success:', function() {
      let admin = people[0]; // mengambil data dari fake
      // console.log(admin); // uncomment untuk mengetahui data admin
      
    })
    describe('Fail:', function() {
      test('Should return status code 400 with result of JSON because the price is less than 0', function (done) {
        done()
      })
      test('jumlah ga boleh negatif', function (done) {
        done()
      })
      test('nama harus diisi dengan sebagai berikut', function (done) {
        done()
      })
      test('merk ga boleh duplikat', function (done) {
        done()
      })
    })
  })

  describe('Edit a product', function() {
    describe('Success:', function() {

    })
    describe('Fail:', function() {

    })
  })
})
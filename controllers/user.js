// models
const { User } = require('../models/index.js');
// helpers
const { compare } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class UserController {
  static register(req, res, next) {
    // console.log(req.headers) // untuk mengetahui headers

    const inputUser = {
      email: req.body.email,
      password: req.body.password
    }

    User
      .create(inputUser)
      .then(user => {
        res.status(201).json({
          id: user.id,
          email: user.email
        });
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const inputUser = {
      email: req.body.email,
      password: req.body.password
    }

    User
      .findOne({
        where: {
          email: inputUser.email
        }
      })
      .then(user => {
        if (!user || !compare(inputUser.password, user.password)) {
          throw {
            code: 400,
            message: 'invalid username/password'
          }
        } else {
          let payload = {
            email: user.email
          }

          let token = signToken(payload);

          res.status(200).json({
            access_token: token
          });
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserController;
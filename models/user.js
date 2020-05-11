'use strict';

// helpers
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 8],
          msg: 'Password length should between 4 and 8'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      }
    },
    sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
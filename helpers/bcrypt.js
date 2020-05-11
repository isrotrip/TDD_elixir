// dependencies
const bcrypt = require('bcryptjs');

function compare(password, hash) {
  try {
    return bcrypt.compareSync(password, hash);
  } catch (err) {
    throw err;
  }
}

function hashPassword(password) {
  try {
    const salt = bcrypt.genSaltSync(4);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  compare,
  hashPassword
}

// dependencies
const jwt = require('jsonwebtoken');

function signToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  signToken,
  verifyToken
}
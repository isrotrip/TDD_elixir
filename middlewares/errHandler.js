function errHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    err.code = 400;
    err.message = err.errors.map(detail => {
      return detail.message
    });
  }
  err.code = err.code || 500;
  res.status(err.code).json({
    message: err.message
  })
}

module.exports = errHandler;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// dependencies
const express = require('express');
// basic routing
const routes = require('./routes/index.js');
// middlewares
const errHandler = require('./middlewares/errHandler.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errHandler);

module.exports = app;
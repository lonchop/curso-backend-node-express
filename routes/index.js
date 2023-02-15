const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');

function routerApi(api) {
  const routes = express.Router();
  api.use("/api/v1/", routes)
  routes.use('/products', productsRouter);
  routes.use('/categories', categoriesRouter);
  routes.use('/users', usersRouter);
}

module.exports = routerApi;

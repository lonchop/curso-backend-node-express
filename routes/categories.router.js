const express = require('express');

const categoriesRouter = express.Router();

categoriesRouter.get('/', (req, res) => {
  res.json({
    name: 'Electronics',
  });
});

categoriesRouter.get('/:id(1)', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'laptop',
    price: 3000,
  });
});

module.exports = categoriesRouter;

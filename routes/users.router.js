const express = require('express');

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  res.json({
    name: 'Orangel',
    age: '32',
  });
});

usersRouter.get('/:id(1)', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'laptop',
    price: 3000,
  });
});

module.exports = usersRouter;

const express = require('express');
const ProductsService = require('.././services/product.service');
const validatorHandler = require('.././middleware/validator.handler');
const {
  createProductShema,
  updateProductShema,
  getProductShema,
} = require('.././schemas/product.schema');

const productsRouter = express.Router();

const service = new ProductsService();

productsRouter.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

productsRouter.get(
  '/:id',
  validatorHandler(getProductShema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);

      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

productsRouter.post(
  '/',
  validatorHandler(createProductShema, 'body'),
  async (req, res) => {
    const body = req.body;

    const newProduct = await service.create(body);

    res.status(201).json({
      message: 'created',
      newProduct,
    });
  }
);

productsRouter.patch(
  '/:id',
  validatorHandler(getProductShema, 'params'),
  validatorHandler(updateProductShema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const product = await service.update(id, body);
      res.json({
        message: 'Product updated',
        product,
      });
    } catch (err) {
      next(err);
    }
  }
);

productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (err) {
    next(err);
  }
}),
  (module.exports = productsRouter);

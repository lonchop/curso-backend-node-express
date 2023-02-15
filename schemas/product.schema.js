const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(4).max(12).messages({
    'string.base': `" nombre "debe ser un tipo de 'texto'`,
    'string.empty': `"nombre "no puede ser un campo vacío`,
    'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
    'string.max': `"nombre" debe tener una longitud máxima de {#limit}`,
  });;
// const name = Joi.string()
//   .regex(/^[a-zA-Z0-9 ]{4,12}$/)
//   .messages({
//     'string.base': `" nombre "debe ser un tipo de 'texto'`,
//     'string.empty': `"nombre "no puede ser un campo vacío`,
//     'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
//     'string.max': `"nombre" debe tener una longitud máxima de {#limit}`,
//   });
const price = Joi.number().integer().min(10);

const createProductShema = Joi.object({
  name: name.required(),
  price: price.required(),
});

const updateProductShema = Joi.object({
  name: name,
  price: price,
});

const getProductShema = Joi.object({
  id: id.required(),
});

module.exports = { createProductShema, updateProductShema, getProductShema };

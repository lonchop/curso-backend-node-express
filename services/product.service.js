const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 4;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        // price: faker.commerce.price(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
      image: faker.image.imageUrl(),
    };

    this.products.push(newProduct);

    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }

  findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product Not Found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is Blocked');
    }
    return product;
  }

  update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      // throw new Error('Product Not Found');
      throw boom.notFound('Product Not Found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }
    this.products.splice(index, 1);
    return { id, message: 'Deleted' };
  }
}

module.exports = ProductsService;

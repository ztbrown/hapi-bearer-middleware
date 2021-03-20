'use strict';

const { BearerStrategy } = require('../middleware/bearer.js') 

module.exports = {
  method: 'GET',
  path: '/hello',
  options: {
    handler: BearerStrategy("ReaderWriter", (request, h) => {
      return "Hello World"
    })
  }
};

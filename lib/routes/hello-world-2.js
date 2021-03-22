'use strict';

module.exports = {
  method: 'GET',
  path: '/hello2',
    options: {
      handler: (request, h) => {
        return "Hello World 2"
      },
      auth: 'simple'
    }
};

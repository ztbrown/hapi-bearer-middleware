'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');
const auth = {}
auth.scheme = (server, options) => {
  const scheme = {
    authenticate: async (request, h) => {
      let authorization = request.raw.req.headers.authorization;
      const [tokenType, token] = authorization.split(/\s+/);
      const { isValid, credentials, artifacts } = await options.validate(request,token,h)
      if (!isValid) {
        return h.unauthenticated("unauthorized", { credentials: credentials || {}, artifacts })
      }

      return h.authenticated({credentials, artifacts})
    }
  }
  return scheme;
}

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

    server.register({
      name: 'spike-scheme',
      register: (server, options) => server.auth.scheme('spike-scheme', auth.scheme)
    })

    server.auth.strategy('simple', 'spike-scheme', {
      validate: async (request, token, h) => {
        console.log(token)
        const credentials = { token };
        const artifacts = { test: 'info' };
        const isValid = true;

        return { isValid, credentials, artifacts };
      }
    });

    server.auth.default('simple');

     // Custom plugin code can go here
      await HauteCouture.using()(server, options);
    }
};

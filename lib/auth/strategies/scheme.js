const Boom = require('@hapi/boom');

const auth = {}

auth.scheme = (server, options) => {
  const scheme = {
    authenticate: async (request, h) => {
      let authorization = request.raw.req.headers.authorization;
      if (!authorization) {
        return Boom.unauthorized(null, "bearer") 
      }
      const [tokenType, token] = authorization.split(/\s+/);
      const { isValid, credentials, artifacts } = await options.validate(request,token,h)
      if (!isValid) {
        return h.unauthenticated(Boom.unauthorized('Bad token', 'bearer'), { credentials: credentials || {}, artifacts })
      }

      return h.authenticated({credentials, artifacts})
    }
  }
  return scheme;
}

exports.plugin = {
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
        const isValid = token == '12345' 

        return { isValid, credentials, artifacts };
      }
    });
  }
};

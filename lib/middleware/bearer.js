function BearerStrategy(role, func) {
  return (request, h) => {
    console.log(`do the auth for ${role}`)
    return func.apply(request, h)
  }
}

exports.BearerStrategy = BearerStrategy

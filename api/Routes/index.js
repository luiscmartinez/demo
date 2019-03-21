const routeAuth = require('./auth')
const routeApi = require('./api')
module.exports = (server) => {
  server.use('/auth', routeAuth)
  server.use('/api', routeApi)
}
